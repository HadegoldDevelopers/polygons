import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { supabaseService } from "@/lib/supabase/service";

export async function GET(req: Request) {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabaseService
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "active";

  let query = supabaseService
  .from("staking_positions")
  .select("*, profiles(name, email), staking_terms(name, apr, months), coins_market(decimals)")
  .order("created_at", { ascending: false });


  if (status !== "all") query = query.eq("status", status);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Compute derived fields
  const now = Date.now();

  const enriched = data.map((p) => {
    const start = new Date(p.start_at).getTime();
    const end   = new Date(p.end_at).getTime();

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.max(totalDays - daysElapsed, 0);

    const progress = Math.min(Math.round((daysElapsed / totalDays) * 100), 100);

    // live earnings (APR snapshot)
    const dailyRate = Number(p.apr_snapshot) / 100 / 365;
    const liveEarned = p.amount * dailyRate * daysElapsed;

    const earned = Number(p.accrued_reward) + liveEarned;

    return {
      ...p,
      days_left: daysLeft,
      progress,
      earned,
      total_days: totalDays,
    };
  });

  return NextResponse.json({ positions: enriched });
}
