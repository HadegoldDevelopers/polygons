import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await supabaseServer();

  // Get authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Pagination params
  const { searchParams } = new URL(req.url);
  const page = Math.max(Number(searchParams.get("page") || 1), 1);
  const limit = Math.min(Number(searchParams.get("limit") || 20), 100);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Fetch positions (optimized)
  const { data: positions, error } = await supabase
    .from("plan_positions")
    .select(`
  id,
  amount,
  daily_profit_snapshot,
  duration_days_snapshot,
  created_at,
  end_date,
  status,
  earned_so_far,
  last_credited_at,
  staking_plans (
    name,
    duration_days,
    daily_profit
  )
`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch USD balance safely
  const { data: usdWallet, error: walletError } = await supabase
    .from("wallets_with_value")
    .select("amount")
    .eq("user_id", user.id)
    .eq("symbol", "USD")
    .maybeSingle();

  if (walletError) {
    console.error("Wallet fetch error:", walletError.message);
  }

  // Build response
  const response = {
    positions: positions ?? [],
    balance: usdWallet?.amount ?? 0,
    pagination: {
      page,
      limit,
      hasMore: (positions?.length ?? 0) === limit,
    },
  };

  return NextResponse.json(response);
}