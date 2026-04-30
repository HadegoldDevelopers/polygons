import { supabaseService } from "@/lib/supabase/service";

export async function GET() {
  const { data, error } = await supabaseService
    .from("notifications")
    .select("*, profiles(name)")
    .order("time", { ascending: false })
    .limit(20);

  if (error) {
    return Response.json([], { status: 200 });
  }

  return Response.json(data ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();
  const inserts = body.user_ids.map((uid: string) => ({
    user_id: uid,
    text: body.text,
    read: false,
  }));

  const { error } = await supabaseService
    .from("notifications")
    .insert(inserts);

  if (error) {

    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
