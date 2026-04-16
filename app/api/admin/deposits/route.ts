import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") ?? "all";

  let query = supabaseService
    .from("deposit_sessions")
    .select("*, profiles(name, email)")
    .order("created_at", { ascending: false });

  if (filter !== "all") {
    query = query.eq("status", filter);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
