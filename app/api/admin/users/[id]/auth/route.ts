import { NextResponse, NextRequest } from "next/server";
import { supabaseService } from "@/lib/supabase/service";

type UpdateUserPayload = {
  email?:    string;
  password?: string;
};

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id }              = await context.params;
    const body                = await req.json();
    const { email, password } = body;

    const payload: UpdateUserPayload = {};
    if (email    && email.trim()    !== "") payload.email    = email.trim();
    if (password && password.length  >  0) payload.password = password;

    if (Object.keys(payload).length === 0) {
      return NextResponse.json({ ok: true });
    }

    const { data, error } = await supabaseService.auth.admin.updateUserById(
      id,
      payload
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (payload.email) {
      await supabaseService
        .from("profiles")
        .update({ email: payload.email })
        .eq("id", id);
    }

    return NextResponse.json({ user: data.user });

  } catch (error) {
    console.error("AUTH UPDATE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}