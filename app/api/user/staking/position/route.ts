import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { supabaseService } from "@/lib/supabase/service";

export async function GET() {
  try {
    const supabase = await supabaseServer();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch staking positions
    const { data: positions } = await supabaseService
      .from("staking_positions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    // Fetch ALL wallet coins
    const { data: wallets } = await supabaseService
      .from("wallets")
      .select("symbol, amount")
      .eq("user_id", user.id);

    // Fetch terms
    const { data: terms } = await supabaseService
      .from("staking_terms")
      .select("*");

    // Fetch plans
    const { data: plans } = await supabaseService
      .from("staking_plans")
      .select("*");

    return NextResponse.json({
      positions: positions ?? [],
      wallets: wallets ?? [],
      terms: terms ?? [],
      plans: plans ?? [],
    });

  } catch (err) {
    console.error("GET /api/user/staking/position error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
