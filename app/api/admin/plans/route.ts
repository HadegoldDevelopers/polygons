import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { supabaseService } from "@/lib/supabase/service";

export async function GET() {
  const supabase = await supabaseServer();
  const { data: { user }, error: userErr } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabaseService
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabaseService
    .from("plan_positions")
    .select(`
      *,
      profiles(name, email),
      staking_plans:plan_id (name, apr)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message, details: error }, { status: 500 });
  }

  return NextResponse.json({ positions: data });
}

export async function PATCH(req: Request) {

  const body = await req.json();
  const { id, profiles, staking_plans, ...cleanPayload } = body;

  const { data, error } = await supabaseService
    .from("plan_positions")
    .update(cleanPayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message, details: error }, { status: 500 });
  }

  return NextResponse.json({ position: data });
}