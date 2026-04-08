import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/service";
import { createNotification } from "@/lib/helper/notifications";
import crypto from "crypto";
import { recordTransaction } from "@/lib/helper/transactions";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-nowpayments-sig");

    // Verify NOWPayments signature
    const expectedSig = crypto
      .createHmac("sha512", process.env.NOWPAYMENTS_IPN_SECRET!)
      .update(body)
      .digest("hex");

    if (signature !== expectedSig) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const data = JSON.parse(body);

    // Only process confirmed payments
    if (data.payment_status !== "finished") {
      return NextResponse.json({ status: "ignored" });
    }

    // Find deposit session
    const { data: session, error: sessionError } = await supabaseService
      .from("deposit_sessions")
      .select("*")
      .eq("id", data.payment_id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Credit user wallet safely using RPC
    await supabaseService.rpc("credit_wallet_transaction", {
      p_user_id: session.user_id,
      p_symbol: session.coin,
      p_amount: data.pay_amount,
      p_session_id: data.payment_id,
    });

    // Mark session as completed
    await supabaseService
      .from("deposit_sessions")
      .update({ status: "completed" })
      .eq("id", session.id);

    // ⭐ Insert unified ledger transaction
    await recordTransaction({
      user_id: session.user_id,
      type: "Deposit",
      direction: "in",
      coin: session.coin,
      amount: data.pay_amount,
      usd: data.price_amount ?? null,
      from_addr: data.pay_address,
      hash: data.payment_id,
      status: "confirmed",
      gateway: "NOWPayments",
      session_id: session.id,
      metadata: data,
    });

    // Notification
    await createNotification(
      session.user_id,
      `Deposit Successful: Your ${session.coin} deposit of ${data.pay_amount} has been confirmed.`
    );

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Deposit webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}