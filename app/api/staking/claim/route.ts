// app/api/staking/claim/route.ts
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { recordTransaction } from "@/lib/helper/transactions";
import { createNotification } from "@/lib/helper/notifications";

export async function POST() {
  const supabase = await supabaseServer();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  // Get active stake
  const { data: pos } = await supabase
    .from("staking_positions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  if (!pos) return Response.json({ error: "No active stake" }, { status: 400 });

  if (pos.earned <= 0) {
    return Response.json({ error: "No rewards available to claim" }, { status: 400 });
  }

  // Get POLYC wallet
  const { data: wallet } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .eq("symbol", "POLYC")
    .single();

  if (!wallet) {
    return Response.json({ error: "POLYC wallet not found" }, { status: 400 });
  }

  // Credit earned POLYC
  await supabase
    .from("wallets")
    .update({ amount: wallet.amount + pos.earned })
    .eq("id", wallet.id);

  // Reset earned
  await supabase
    .from("staking_positions")
    .update({ earned: 0 })
    .eq("id", pos.id);

//Record transaction
  await recordTransaction({
    user_id: user.id,
    type: "Staking",
    direction: "in",
    coin: "POLYC",
    amount: pos.earned,
    metadata: {
      position_id: pos.id,
      plan_id: pos.plan_id,
    },
  });
  // Notification
  await createNotification(
    user.id,
    `You claimed ${pos.earned} POLYC in staking rewards.`
  );

  return Response.json({ success: true });
}
