// /app/api/portfolio/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();

  // Auth
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = auth.user.id;

  // 1. Fetch user wallets
  const { data: wallets } = await supabase
    .from("wallets")
    .select("symbol, amount")
    .eq("user_id", userId);

  // 2. Fetch market data
  const { data: market } = await supabase
    .from("coins_market")
    .select("symbol, price, change_24h");

  // 3. Fetch coin config (color + icon)
  const { data: coinConfig } = await supabase
     .from("coins")
    .select("symbol, color, icon");

  // 4. Merge all data
  const merged = (wallets || []).map((w) => {
    const m = market?.find((c) => c.symbol === w.symbol);
    const cfg = coinConfig?.find((c) => c.symbol === w.symbol);

    const price = m?.price || 0;
    const value_usd = w.amount * price;

    return {
      symbol: w.symbol,
      amount: w.amount,
      price,
      change_24h: m?.change_24h || 0,
      value_usd,
      color: cfg?.color || "#FF7900",
      icon: cfg?.icon || "•",
    };
  });

  // 5. Total portfolio value
  const totalUSD = merged.reduce((sum, a) => sum + a.value_usd, 0);

  // 6. Add percentage allocation
  const assets = merged.map((a) => ({
    ...a,
    pct: totalUSD > 0 ? (a.value_usd / totalUSD) * 100 : 0,
  }));

  return NextResponse.json({
    totalUSD,
    assets,
  });
}
