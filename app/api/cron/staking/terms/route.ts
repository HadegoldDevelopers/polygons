import { supabaseService } from "@/lib/supabase/service";
import { recordTransaction } from "@/lib/helper/transactions";
import { createNotification } from "@/lib/helper/notifications";

export async function GET() {
  const supabase = supabaseService;

  // Fetch all active staking positions with their staking term
  const { data: positions, error } = await supabase
    .from("staking_positions")
    .select("*, staking_terms(apr, months)")
    .eq("status", "active");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const today = new Date().toISOString().split("T")[0];

  for (const p of positions ?? []) {
    const last = p.last_accrued_at
      ? new Date(p.last_accrued_at)
      : new Date(p.start_at);

    const now = new Date();

    const daysSince = Math.floor(
      (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    );

    // No payout needed today
    if (daysSince <= 0) continue;

    // DAILY RATE = APR / 365
    const dailyRate = Number(p.apr_snapshot) / 100 / 365;

    const dailyReward = Number(p.amount) * dailyRate;
    const creditAmount = dailyReward * daysSince;

    // Update accrued reward
    await supabase
      .from("staking_positions")
      .update({
        accrued_reward: Number(p.accrued_reward) + creditAmount,
        last_accrued_at: today,
      })
      .eq("id", p.id);

    // Record reward transaction
    await recordTransaction({
      user_id: p.user_id,
      type: "Staking",
      direction: "in",
      coin: p.coin,
      amount: creditAmount,
      usd: null,
      status: "confirmed",
      metadata: {
        staking_id: p.id,
        days_credited: daysSince,
      },
    });

    // Notify user
    await createNotification(
      p.user_id,
      `Staking reward credited: ${creditAmount.toFixed(4)} ${p.coin}`
    );

    // Check if staking ended
    if (now >= new Date(p.end_at)) {
      // Return principal
      await recordTransaction({
        user_id: p.user_id,
        type: "Staking",
        direction: "in",
        coin: p.coin,
        amount: p.amount,
        usd: null,
        status: "confirmed",
        metadata: { staking_id: p.id },
      });

      // Mark completed
      await supabase
        .from("staking_positions")
        .update({ status: "completed" })
        .eq("id", p.id);

      await createNotification(
        p.user_id,
        `Your staking position has completed. Principal ${p.amount} ${p.coin} returned.`
      );
    }
  }

  return Response.json({ success: true });
}
