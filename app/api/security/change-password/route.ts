import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function POST(req: Request) {
  const supabase = await supabaseServer();
  const { current, newPw } = await req.json();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Re-authenticate user
  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: current,
  });

  if (reauthError) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 400 }
    );
  }

  // Update password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPw,
  });

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
