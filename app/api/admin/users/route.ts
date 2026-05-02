import { supabaseService } from "@/lib/supabase/service";

export async function GET() {
  const { data, error } = await supabaseService
    .from("profiles")
    .select(`
      id,
      name,
      email,
      is_admin,
      is_banned,
      is_verified,
      country,
      phone,
      created_at
    `)
    .order("created_at", { ascending: false });

  if (error) return Response.json({ users: [] }, { status: 200 });

  return Response.json({ users: data ?? [] });
}
