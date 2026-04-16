import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("api_keys")
    .select("*")
    .eq("user_id", user.id);

  return Response.json(data);
}

export async function POST() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const newKey = crypto.randomUUID().replace(/-/g, "") + "_live";

  const { error } = await supabase
    .from("api_keys")
    .insert({
      user_id: user.id,
      key: newKey,
    });

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ key: newKey });
}

export async function DELETE(req: Request) {
  const supabase = await supabaseServer();
  const { id } = await req.json();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("api_keys")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ success: true });
}
