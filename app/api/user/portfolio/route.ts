// app/api/portfolio/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();

  // Auth
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Single query — view already joins coins + coins_market
  // and calculates usd_value automatically
  const { data: wallets, error } = await supabase
    .from("wallets_with_value")
    .select("*")
    .eq("user_id", auth.user.id)
    .order("usd_value", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const assets = wallets ?? [];

  // Total USD = sum of all wallet usd_values (already calculated by view)
  const totalUSD = assets.reduce((sum, w) => sum + (w.usd_value ?? 0), 0);

  // Add percentage allocation for each coin
  const portfolio = assets.map((w) => ({
    symbol:     w.symbol,
    name:       w.name,
    icon:       w.icon,
    color:      w.color,
    amount:     w.amount,
    price:      w.price,
    usd_value:  w.usd_value,
    change_24h: w.change_24h,
    change_7d:  w.change_7d,
    pct:        totalUSD > 0 ? (w.usd_value / totalUSD) * 100 : 0,
    address:    w.address,
  }));

  return NextResponse.json({ totalUSD, assets: portfolio });
}