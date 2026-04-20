import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/service";
import { getPaymentSettings } from "@/lib/settings/getSettings";

export async function POST(req: Request) {
  try {

  const { coin, network, user_id, amount } = await req.json();
  const settings = await getPaymentSettings();

    if (!coin || !network || !user_id) {
      return NextResponse.json(
        { error: "Missing coin, network, or user_id" },
        { status: 400 }
      );
    }

    if (!amount || amount < 500) {
  return NextResponse.json(
    { error: "Minimum deposit is $500" },
    { status: 400 }
  );
}

    // ADD THIS BLOCK HERE
let payCurrency = coin.toLowerCase();

// Handle USDT
if (coin === "USDT") {
  if (network === "usdterc20") payCurrency = "usdterc20";
  if (network === "usdttrc20") payCurrency = "usdttrc20";
  if (network === "usdtbsc") payCurrency = "usdtbsc";
  if (network === "usdtpolygon") payCurrency = "usdtpolygon";
  if (network === "usdtsol") payCurrency = "usdtsol";
}

// ETH native
if (coin === "ETH" && network === "eth") {
  payCurrency = "eth";
}

// BTC native
if (coin === "BTC" && network === "btc") {
  payCurrency = "btc";
}

// BNB
if (coin === "BNB") {
  if (network === "bsc") payCurrency = "bnbbsc";
  if (network === "bnb") payCurrency = "bnbbnb";
}

    

    // NOW CREATE THE PAYMENT USING payCurrency
    const npRes = await fetch("https://api.nowpayments.io/v1/payment", {
      method: "POST",
      headers: {
        "x-api-key": settings.now_api_key!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: "usd",
        is_fixed_rate: false,
        pay_currency: payCurrency,
        
        ipn_callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/deposit/webhook`,
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
const { data: inserted, error } = await supabaseService
  .from("deposit_sessions")
  .insert({
    id: npData.payment_id,
    user_id,
    coin,
    network,
    pay_address: npData.pay_address,
    pay_amount: npData.pay_amount,
    pay_currency: npData.pay_currency,
    status: "pending",
    created_at: new Date(),
  })
  .select();

// NOW RETURN TO FRONTEND
return NextResponse.json({
  session_id: npData.payment_id,
  address: npData.pay_address,
  amount: npData.pay_amount,
  coin: npData.pay_currency,
  qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${npData.pay_address}`,
  network,
  min_amount: npData.pay_amount,
  confirmations: 1,
  expires_at: npData.valid_until,
});


  } catch (err) {
    console.error("Deposit session error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
