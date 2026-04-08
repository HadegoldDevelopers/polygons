import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("staking_plans")
    .select("*")
    .order("duration_days", { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ plans: data });
}
