import { supabaseService } from "@/lib/supabase/service";

export async function GET() {
  try {
    const { data, error } = await supabaseService
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return Response.json({ users: data });
  } catch (err) {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}