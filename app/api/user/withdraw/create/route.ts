import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/service";
import { recordTransaction } from "@/lib/helper/transactions";
import { createNotification } from "@/lib/helper/notifications";

export async function POST(req: Request) {
  try {
    const { token, amount, address, network } = await req.json();

    if (!token || !amount || !address || !network) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Auth
    const authHeader = req.headers.get("Authorization");
    const tokenHeader = authHeader?.replace("Bearer ", "");
    const { data: { user } } = await supabaseService.auth.getUser(tokenHeader);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch fee
    const { data: coinRow } = await supabaseService
      .from("coins")
      .select("withdraw_fee_token")
      .eq("symbol", token)
      .single();

    if (!coinRow) {
      return NextResponse.json({ error: "Token not found" }, { status: 400 });
    }

    const feeToken = parseFloat(coinRow.withdraw_fee_token || 0);
    const receiveAmount = parseFloat(amount) - feeToken;

    if (receiveAmount <= 0) {
      return NextResponse.json({ error: "Amount too low after fee" }, { status: 400 });
    }

    // Validate balance
    const { data: balanceRow } = await supabaseService
      .from("wallets")
      .select("amount")
      .eq("user_id", user.id)
      .eq("symbol", token)
      .single();

    if (!balanceRow) {
      return NextResponse.json({ error: "Balance not found" }, { status: 400 });
    }

    if (parseFloat(amount) > parseFloat(balanceRow.amount)) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    // Insert withdrawal request
    const { data: withdrawData, error: withdrawError } = await supabaseService
      .from("withdraw_requests")
      .insert({
        user_id: user.id,
        token,
        amount,
        fee: feeToken,
        you_receive: receiveAmount,
        address,
        network,
        status: "pending",
      })
      .select()
      .single();

    if (withdrawError) {
      console.error("Withdraw insert error:", withdrawError);
      return NextResponse.json({ error: "Failed to create withdrawal" }, { status: 500 });
    }

    // Deduct balance
    const newBalance = parseFloat(balanceRow.amount) - parseFloat(amount);

    const { error: updateError } = await supabaseService
      .from("wallets")
      .update({ amount: newBalance })
      .eq("user_id", user.id)
      .eq("symbol", token);

    if (updateError) {
      console.error("Balance update error:", updateError);
      return NextResponse.json({ error: "Failed to update balance" }, { status: 500 });
    }

    // Notification
    await createNotification(
      user.id,
      `Withdrawal request submitted: ${amount} ${token} to ${address}`
    );

    return NextResponse.json({ success: true, request: withdrawData });

  } catch (err) {
    console.error("Withdraw error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
