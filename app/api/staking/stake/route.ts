import { supabaseService } from "@/lib/supabase/service";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { recordTransaction } from "@/lib/helper/transactions";
import { createNotification } from "@/lib/helper/notifications";

export async function POST(req: Request) {
  const supabase = await supabaseServer();
  const { amount, plan_id } = await req.json();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  // Fetch staking plan
  const { data: plan } = await supabase
    .from("staking_plans")
    .select("*")
    .eq("id", plan_id)
    .single();

  if (!plan) return Response.json({ error: "Invalid staking plan" }, { status: 400 });

  if (amount < plan.min_deposit) {
    return Response.json(
      { error: `Minimum stake is ${plan.min_deposit} PC` },
      { status: 400 }
    );
  }

  // Fetch POLYC wallet
  const { data: wallet } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .eq("symbol", "PC")
    .single();

  if (!wallet) {
    return Response.json({ error: "PC wallet not found" }, { status: 400 });
  }

  if (wallet.amount < amount) {
    return Response.json({ error: "Insufficient PC balance" }, { status: 400 });
  }

  // Deduct POLYC from wallet
  await supabase
    .from("wallets")
    .update({ amount: wallet.amount - amount })
    .eq("id", wallet.id);

  // Create staking position
  await supabase.from("staking_positions").insert({
    user_id: user.id,
    amount,
    earned: 0,
    apy: plan.apr,
    lock_days: plan.duration_days,
    days_left: plan.duration_days,
    progress: 0,
    plan_id,
    status: "active",
    created_at: new Date(),
    end_date: new Date(Date.now() + plan.duration_days * 86400000),
  });

  await supabase
  .from("staking_history")
  .insert({
    user_id: user.id,
    plan_id: plan.id,
    event_type: "stake_created",
    amount: amount,
  });


// Record transaction
  await recordTransaction({
    user_id: user.id,
    type: "Staking",
    direction: "out",
    coin: "PC",
    amount,
    metadata: {
      plan_id: plan.id,
      apr: plan.apr,
      duration_days: plan.duration_days,
    },
  });
  // Notification
  await createNotification(
    user.id,
    `You staked ${amount} PC for ${plan.duration_days} days.`
  );

/// 4. REFERRAL REWARD LOGIC
const { data: profile } = await supabase
  .from("profiles")
  .select("referred_by")
  .eq("id", user.id)
  .single();

if (profile?.referred_by) {
  const referrerId = profile.referred_by;

  // Fetch referral percentage from staking plan
  const referralPct = plan.referral_bonus || 0;

  if (referralPct > 0) {
    const reward = (amount * referralPct) / 100;

    // Fetch referrer's PC wallet using service role
    const { data: refWallet } = await supabaseService
      .from("wallets")
      .select("*")
      .eq("user_id", referrerId)
      .eq("symbol", "PC")
      .single();

    if (!refWallet) {
      console.error("Referrer has no PC wallet — unexpected.");
      return;
    }

    // 1. Credit reward to referrer wallet
    await supabaseService
      .from("wallets")
      .update({ amount: refWallet.amount + reward })
      .eq("id", refWallet.id);

    // 2. Insert referral earnings
    await supabaseService.from("referral_earnings").insert({
      referrer_id:  referrerId,
    referred_id:  user.id,
    amount: reward,
    created_at: new Date(),
  })
  .select();
    // 3. Record referral transaction
    await recordTransaction({
      user_id: referrerId,
      type: "Bonus",
      direction: "in",
      coin: "PC",
      amount: reward,
      metadata: {
        referred_user: user.id,
        stake_amount: amount,
        plan_id,
        referral_pct: referralPct,
      },
    });

    // 4. Notify referrer
    await createNotification(
      referrerId,
      `You earned ${reward} PC from your referral's stake of ${amount} PC.`
    );
  }
}

  return Response.json({ success: true });
}
