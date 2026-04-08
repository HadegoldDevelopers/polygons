// app/api/staking/position/route.ts
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch active staking position
  const { data: positions } = await supabase
  .from("staking_positions")
  .select("*, staking_plans(*)")
  .eq("user_id", user.id)
  .eq("status", "active")
  .order("created_at", { ascending: false });

  // Fetch POLYC wallet
  const { data: wallet } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .eq("symbol", "POLYC")
    .single();

  return Response.json({
     positions: positions ?? [],
    balance: wallet?.amount ?? 0,
  });
}
