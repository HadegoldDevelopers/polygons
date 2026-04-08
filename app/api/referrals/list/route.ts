import { supabaseServer } from "@/lib/supabase/supabaseServer";


export async function GET() {
  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
  .from("referrals")
  .select(`
    created_at,
    referred_id,
    profiles:profiles!referrals_referred_id_fkey(
      name,
      earnings:referral_earnings!referral_earnings_referred_id_fkey(amount)
    )
  `)
  .eq("referrer_id", auth.user.id);

  

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data ?? []);
}
