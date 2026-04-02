import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { coin, network, user_id } = await req.json();

    if (!coin || !network || !user_id) {
      return NextResponse.json(
        { error: "Missing coin, network, or user_id" },
        { status: 400 }
      );
    }

    // Create NOWPayments deposit session (USD → crypto)
    const npRes = await fetch("https://api.nowpayments.io/v1/payment", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: 10,          
        price_currency: "usd", 
        pay_currency: network,
        is_fixed_rate: true,
        ipn_callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit/webhook`,
      }),
    });

    const npData = await npRes.json();

    if (!npData.pay_address) {
      return NextResponse.json(
        { error: "NOWPayments error", details: npData },
        { status: 500 }
      );
    }

    // Store deposit session
    await supabase.from("deposit_sessions").insert({
      id: npData.payment_id,
      user_id,
      coin,
      network,
      pay_address: npData.pay_address,
      pay_amount: npData.pay_amount,
      pay_currency: npData.pay_currency,
      status: "pending",
      created_at: new Date(),
    });

    return NextResponse.json({
      session_id: npData.payment_id,
      address: npData.pay_address,
      amount: npData.pay_amount,     // crypto amount
      coin: npData.pay_currency,     // crypto symbol
      qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${npData.pay_address}`,
      network,
      min_amount: npData.pay_amount,
      confirmations: 1,
    });

  } catch (err) {
    console.error("Deposit session error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
