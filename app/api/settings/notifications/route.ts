import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("user_notifications")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return Response.json(data);
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

