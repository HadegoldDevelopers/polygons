import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("referral_code")
    .eq("id", auth.user.id)
    .single();

  if (error || !data) {
    return Response.json({ error: "Profile not found" }, { status: 404 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

  return Response.json({
    link: `${baseUrl}/register?ref=${data.referral_code}`
  });
}
