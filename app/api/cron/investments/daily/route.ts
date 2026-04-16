import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { recordTransaction } from "@/lib/helper/transactions";
import { createNotification } from "@/lib/helper/notifications";

export async function GET() {
  const supabase = await supabaseServer();

  // Fetch all active plans
  const { data: positions, error } = await supabase
    .from("plan_positions")
    .select("*")
    .eq("status", "active");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const today = new Date().toISOString().split("T")[0];

  for (const p of positions ?? []) {
    const last = p.last_credited_at
      ? new Date(p.last_credited_at)
      : new Date(p.created_at);

    const now = new Date();

    const daysSince = Math.floor(
      (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    );

    // No payout needed today
    if (daysSince <= 0) continue;

    // Compute daily earnings
    const dailyEarn =
      p.amount * (p.daily_profit_snapshot / 100);

    const creditAmount = dailyEarn * daysSince;

    // Fetch wallet
    const { data: wallet } = await supabase
      .from("wallets")
      .select("amount")
      .eq("user_id", p.user_id)
      .eq("symbol", "USD")
      .single();

    // Credit wallet with daily earnings
    await supabase
      .from("wallets")
      .update({
        amount: wallet.amount + creditAmount,
      })
      .eq("user_id", p.user_id)
      .eq("symbol", "USD");

    // Update plan
    await supabase
      .from("plan_positions")
      .update({
        earned_so_far: p.earned_so_far + creditAmount,
        last_credited_at: today,
      })
      .eq("id", p.id);

    // Record transaction
    await recordTransaction({
      user_id: p.user_id,
      type: "Earnings",
      direction: "in",
      coin: "USD",
      amount: creditAmount,
      usd: creditAmount,
      status: "confirmed",
      metadata: {
        plan_id: p.id,
        days_credited: daysSince,
      },
    });

    // Notify user
    await createNotification(
      p.user_id,
      `Daily earnings credited: $${creditAmount.toFixed(2)}`
    );

    // Check if plan ended
    if (now >= new Date(p.end_date)) {
      // Return principal
      await supabase
        .from("wallets")
        .update({
          amount: wallet.amount + creditAmount + p.amount,
        })
        .eq("user_id", p.user_id)
        .eq("symbol", "USD");

      // Mark completed
      await supabase
        .from("plan_positions")
        .update({ status: "completed" })
        .eq("id", p.id);

      // Notify user
      await createNotification(
        p.user_id,
        `Your investment has completed. Principal $${p.amount} returned.`
      );

      // Record completion transaction
      await recordTransaction({
        user_id: p.user_id,
        type: "Investment",
        direction: "in",
        coin: "USD",
        amount: p.amount,
        usd: p.amount,
        status: "confirmed",
        metadata: {
          plan_id: p.id,
        },
      });
    }
  }

  return Response.json({ success: true });
}
