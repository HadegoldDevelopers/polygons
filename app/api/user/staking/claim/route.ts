// app/api/user/staking/claim/route.ts
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { supabaseService } from "@/lib/supabase/service";
import { recordTransaction } from "@/lib/helper/transactions";
import { createNotification } from "@/lib/helper/notifications";

export async function POST(req: Request) {
  const supabase = await supabaseServer();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { position_id } = await req.json();

  if (!position_id) {
    return Response.json({ error: "Missing position_id" }, { status: 400 });
  }

  // Fetch the specific staking position
  const { data: pos, error: posError } = await supabaseService
    .from("staking_positions")
    .select("id, coin, accrued_reward, claimed_reward, term_id")
    .eq("id", position_id)
    .eq("user_id", user.id)
    .single();

  if (posError || !pos) {
    return Response.json({ error: "Stake not found" }, { status: 404 });
  }

  const claimAmount = Number(pos.accrued_reward ?? 0);

  if (claimAmount <= 0) {
    return Response.json({ error: "No rewards available to claim" }, { status: 400 });
  }

  // Fetch wallet for the same coin
  const { data: wallet } = await supabaseService
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .eq("symbol", pos.coin)
    .single();

  if (!wallet) {
    return Response.json({ error: `${pos.coin} wallet not found` }, { status: 400 });
  }

  // Credit wallet
  await supabaseService
    .from("wallets")
    .update({ amount: wallet.amount + claimAmount })
    .eq("id", wallet.id);

  // Update staking position
  await supabaseService
    .from("staking_positions")
    .update({
      accrued_reward: 0,
      claimed_reward: pos.claimed_reward + claimAmount,
      last_accrued_at: new Date().toISOString(),
    })
    .eq("id", pos.id);

  // Record transaction
  await recordTransaction({
    user_id: user.id,
    type: "Staking",
    direction: "in",
    coin: pos.coin,
    amount: claimAmount,
    metadata: { position_id: pos.id, term_id: pos.term_id },
  });

  // Notification
  await createNotification(
    user.id,
    `You claimed ${claimAmount.toFixed(8)} ${pos.coin} in staking rewards.`
  );

  return Response.json({
    success: true,
    claimed: claimAmount,
    coin: pos.coin,
    position_id: pos.id,
  });
}
