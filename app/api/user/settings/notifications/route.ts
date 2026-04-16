import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await supabase
    .from("user_notifications")
    .select("*")
    .eq("user_id", auth.user.id)
    .single();

  // If row doesn't exist → return defaults
  return Response.json(
    data ?? {
      deposits: true,
      withdrawals: true,
      staking_rewards: true,
      price_alerts: false,
      security_alerts: true,
      newsletter: false,
    }
  );
}


export async function POST(req: Request) {
  const supabase = await supabaseServer();
  const body = await req.json();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("user_notifications")
    .upsert({
      user_id: user.id,
      ...body,
    });

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ success: true });
}

