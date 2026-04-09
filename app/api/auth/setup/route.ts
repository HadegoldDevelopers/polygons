import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/service";

const COINS = [
  "PC","USDT","BTC","ETH",
];

function generateHexAddress() {
  return (
    "0x" +
    Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")
  );
}

function generateReferralCode(email: string) {
  const base = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 5);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${base}${rand}`;
}

export async function POST(req: Request) {
  try {
    const {
      user_id,
      email,
      first_name,
      last_name,
      country,
      phone,
      referral_code_used,
    } = await req.json();

    if (!user_id || !email) {
      return NextResponse.json({ error: "Missing user_id or email" }, { status: 400 });
    }

    // 1. CREATE PROFILE
     const normalizedEmail = email.toLowerCase();

    await supabaseService.from("profiles").insert({
      id: user_id,
      name: `${first_name} ${last_name}`,
      email: normalizedEmail,
      country,
      phone,
    });

    // 2. CREATE WALLETS
    const walletRows = COINS.map((symbol) => ({
      user_id,
      symbol,
      address: generateHexAddress(),
      amount: 0,
      created_at: new Date().toISOString(),
    
    }));


const { error: walletError } = await supabaseService
  .from("wallets")
  .insert(walletRows);

if (walletError) {
  console.error("Wallet creation failed:", walletError);
}
    // 3. GENERATE REFERRAL CODE
    const newReferralCode = generateReferralCode(normalizedEmail);

    const { error: referralError } = await supabaseService
  .from("profiles")
  .update({ referral_code: newReferralCode })
  .eq("id", user_id);

if (referralError) {
  console.error("Referral code creation failed:", referralError);
}
;

    // 4. FIND REFERRER
let referrerId: string | null = null;

const normalizedReferralCodeUsed = referral_code_used
  ? referral_code_used.toUpperCase()
  : null;

if (normalizedReferralCodeUsed) {
  const { data: refUser } = await supabaseService
    .from("profiles")
    .select("id")
    .eq("referral_code", normalizedReferralCodeUsed)
    .single();

  if (refUser) referrerId = refUser.id;
}
    // 5. CREATE REFERRAL RECORD
    if (referrerId) {
      await supabaseService.from("referrals").insert({
        referrer_id: referrerId,
        referred_id: user_id,
      });
    }
    
    // 6. UPDATE PROFILE WITH REFERRER ID
if (referrerId) {
  const { error: updateError } = await supabaseService
    .from("profiles")
    .update({ referred_by: referrerId })
    .eq("id", user_id);

  if (updateError) {
    console.error("Failed to update referred_by:", updateError);
  }
}
    return NextResponse.json({
      success: true,
      referral_code: newReferralCode,
      wallets_created: COINS.length,
    });
  } catch (err) {
    console.error("Setup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
