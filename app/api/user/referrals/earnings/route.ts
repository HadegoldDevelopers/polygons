import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("referral_earnings")
    .select("amount, created_at")
    .eq("referrer_id", auth.user.id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  const rows = data ?? [];

  const total = rows.reduce((sum, r) => sum + Number(r.amount), 0);

  const monthly = rows
    .filter(
      (r) => new Date(r.created_at).getMonth() === new Date().getMonth()
    )
    .reduce((sum, r) => sum + Number(r.amount), 0);

  return Response.json({
    total,
    monthly,
  });
}

