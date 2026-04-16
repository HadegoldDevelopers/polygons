import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await supabaseServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("plan_positions")
    .select(`
      id,
      user_id,
      amount,
      daily_profit_snapshot,
      duration_days_snapshot,
      created_at,
      end_date,
      status,
      staking_plans (
        id,
        name,
        duration_days,
        daily_profit
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch USD balance
  const { data: usdWallet } = await supabase
    .from("wallets")
    .select("amount")
    .eq("user_id", user.id)
    .eq("symbol", "USD")
    .single();

  return NextResponse.json({
    positions: data ?? [],
    balance: usdWallet?.amount ?? 0,
  });
}
