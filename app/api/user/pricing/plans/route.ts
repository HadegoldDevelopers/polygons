import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { recordTransaction } from "@/lib/helper/transactions";
import { createNotification } from "@/lib/helper/notifications";

// ─────────────────────────────────────────────
// GET → Fetch all investment plans
// ─────────────────────────────────────────────
export async function GET() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("staking_plans")
    .select("*")
    .order("duration_days", { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const plans = (data ?? []).map((p) => ({
    ...p,
    daily_profit:
      p.daily_profit !== null && p.daily_profit !== undefined
        ? Number(p.daily_profit)
        : p.apr
        ? Number(p.apr) / 365
        : 0,
  }));

  return Response.json({ plans });
}

// ─────────────────────────────────────────────
// POST → Purchase an investment plan
// ─────────────────────────────────────────────
export async function POST(req: Request) {
  const supabase = await supabaseServer();
  const body = await req.json();

  const { amount, plan_id } = body;

  if (!amount || !plan_id) {
    return Response.json(
      { error: "Missing amount or plan_id" },
      { status: 400 }
    );
  }

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch plan (include min/max if you have them)
  const { data: plan, error: planError } = await supabase
    .from("staking_plans")
    .select("daily_profit, duration_days, min_deposit, max_deposit, name")
    .eq("id", plan_id)
    .single();

  if (planError || !plan) {
    return Response.json({ error: "Plan not found" }, { status: 404 });
  }

  const daily = Number(plan.daily_profit);
  const duration = Number(plan.duration_days);

  // Optional: min/max validation (only if those columns exist and you want them enforced)
  if (plan.min_deposit && amount < plan.min_deposit) {
    return Response.json(
      { error: `Minimum investment is ${plan.min_deposit} USD` },
      { status: 400 }
    );
  }

  if (plan.max_deposit && amount > plan.max_deposit) {
    return Response.json(
      { error: `Maximum investment is ${plan.max_deposit} USD` },
      { status: 400 }
    );
  }

  // Compute end date
  const end_date = new Date();
  end_date.setDate(end_date.getDate() + duration);

  // Fetch USD wallet
  const { data: usdWallet, error: walletError } = await supabase
    .from("wallets_with_value")
    .select("amount")
    .eq("user_id", user.id)
    .eq("symbol", "USD")
    .single();

  if (walletError || !usdWallet) {
    return Response.json(
      { error: "USD wallet not found" },
      { status: 400 }
    );
  }

  if (usdWallet.amount < amount) {
    return Response.json(
      { error: "Insufficient USD balance" },
      { status: 400 }
    );
  }

  // Deduct USD
  const { error: deductError } = await supabase
    .from("wallets")
    .update({ amount: usdWallet.amount - amount })
    .eq("user_id", user.id)
    .eq("symbol", "USD");

  if (deductError) {
    return Response.json(
      { error: "Failed to deduct balance" },
      { status: 500 }
    );
  }

  // Insert position
  const { error: insertError } = await supabase
    .from("plan_positions")
    .insert({
      user_id: user.id,
      plan_id,
      amount,
      daily_profit_snapshot: daily,
      duration_days_snapshot: duration,
      end_date: end_date.toISOString(),
      status: "active",
    });

  if (insertError) {
    return Response.json(
      { error: "Failed to create investment" },
      { status: 500 }
    );
  }

  await recordTransaction({
    user_id: user.id,
    type: "Investment",
    direction: "out",
    coin: "USD",
    amount,
    usd: amount,
    status: "confirmed",
    metadata: {
      plan_id,
      daily_profit: daily,
      duration_days: duration,
    },
  });

  await createNotification(
    user.id,
    `Investment Started: $${amount} in plan ${plan.name} with daily profit ${daily}% for ${duration} days.`
  );

  return Response.json({ success: true });
}
