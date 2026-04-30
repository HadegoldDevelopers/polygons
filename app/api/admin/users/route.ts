import { supabaseService } from "@/lib/supabase/service";

export async function GET() {
  const { data, error } = await supabaseService
    .from("profiles")
    .select("id, name, email");

  if (error) return Response.json([], { status: 200 });

  return Response.json(data ?? []);
}
