import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/service";

const PAGE_SIZE = 20;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page   = Number(searchParams.get("page") ?? 0);
  const filter = searchParams.get("filter") ?? "all";

  let query = supabaseService
    .from("transactions")
    .select("*, profiles(name, email)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

  if (filter !== "all") query = query.eq("type", filter);

  const { data, count, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    data,
    count,
    page,
    pageSize: PAGE_SIZE,
  });
}
