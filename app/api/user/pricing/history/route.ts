import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = await supabaseServer();

  //Get user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Pagination params
  const { searchParams } = new URL(req.url);
  const page = Math.max(Number(searchParams.get("page") || 1), 1);
  const limit = Math.min(Number(searchParams.get("limit") || 20), 100);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Fetch history (optimized)
  const { data: history, error } = await supabase
    .from("pricing_history")
    .select(`
      id,
      amount,
      type,
      status,
      created_at
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Response
  const response = {
    history: history ?? [],
    pagination: {
      page,
      limit,
      hasMore: (history?.length ?? 0) === limit,
    },
  };

  return NextResponse.json(response);
}