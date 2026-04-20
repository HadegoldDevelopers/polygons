import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 0);
    const limit = Number(searchParams.get("limit") || 20);

    const from = page * limit;
    const to = from + limit - 1;

    const filter = searchParams.get("filter"); // pending, approved, rejected

    let query = supabaseService
      .from("withdraw_requests")
      .select(
        `
        id,
        user_id,
        token,
        amount,
        address,
        network,
        status,
        tx_hash,
        fee,
        you_receive,
        admin_note,
        created_at,
        updated_at,
        profiles (
          name,
          email
        )
      `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false });

    // status filter
    if (filter) {
      query = query.eq("status", filter);
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("WITHDRAW REQUESTS ERROR:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (err) {
    console.error("WITHDRAW REQUESTS FATAL:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}