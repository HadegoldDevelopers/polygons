import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import crypto from "crypto";

export async function POST(req: Request) {
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
  const { data: session } = await supabase
    .from("deposit_sessions")
    .select("*")
    .eq("id", data.payment_id)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  // Credit user wallet
  await supabase
    .from("wallets")
    .update({
      amount: supabase.rpc("increment_balance", {
        user_id: session.user_id,
        symbol: session.coin,
        amount: data.pay_amount,
      }),
    })
    .eq("user_id", session.user_id)
    .eq("symbol", session.coin);

  // Log transaction
  await supabase.from("transactions").insert({
    user_id: session.user_id,
    type: "deposit",
    coin: session.coin,
    amount: data.pay_amount,
    tx_ref: data.payment_id,
    status: "confirmed",
    created_at: new Date(),
  });

  // Mark session as completed
  await supabase
    .from("deposit_sessions")
    .update({ status: "completed" })
    .eq("id", session.id);

  return NextResponse.json({ success: true });
}
