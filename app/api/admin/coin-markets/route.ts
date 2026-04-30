import { supabaseService } from "@/lib/supabase/service";

export async function GET() {
  const { data } = await supabaseService
    .from("coins_market")
    .select("*")
    .order("market_cap", { ascending: false });

  return Response.json(data ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();

  await supabaseService
    .from("coins_market")
    .upsert(
      { ...body, updated_at: new Date().toISOString() },
      { onConflict: "symbol" }
    );

  return Response.json({ success: true });
}
