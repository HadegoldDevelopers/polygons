import { supabaseService } from "@/lib/supabase/service";

export async function GET() {
  console.log("📥 [GET] /api/admin/notifications → Fetching notifications...");

  const { data, error } = await supabaseService
    .from("notifications")
    .select("*, profiles(name)")
    .order("time", { ascending: false })
    .limit(20);

  if (error) {
    console.error("❌ [GET] Error fetching notifications:", error);
    return Response.json([], { status: 200 });
  }

  console.log("✅ [GET] Notifications fetched:", data?.length ?? 0);
  return Response.json(data ?? []);
}

export async function POST(req: Request) {
  console.log("📥 [POST] /api/admin/notifications → Incoming request");

  const body = await req.json();
  console.log("📝 [POST] Body received:", body);

  const inserts = body.user_ids.map((uid: string) => ({
    user_id: uid,
    text: body.text,
    read: false,
  }));

  console.log("🧩 [POST] Inserts prepared:", inserts);

  const { error } = await supabaseService
    .from("notifications")
    .insert(inserts);

  if (error) {
    console.error("❌ [POST] Error inserting notifications:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  console.log("✅ [POST] Notifications inserted successfully");
  return Response.json({ success: true });
}
