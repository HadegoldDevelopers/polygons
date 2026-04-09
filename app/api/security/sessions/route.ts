import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import type { SupabaseAdminSession } from "@/hooks/useSecurity";

export async function GET() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ sessions: [] }, { status: 200 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users/${user.id}`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ sessions: [] }, { status: 200 });
  }

  const sessions = (data.sessions ?? []) as SupabaseAdminSession[];

  return NextResponse.json({ sessions });
}
