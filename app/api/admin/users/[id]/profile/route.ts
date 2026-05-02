import { NextResponse, NextRequest } from "next/server";
import { supabaseService } from "@/lib/supabase/service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body   = await req.json();

    const { data: profile, error: profileError } = await supabaseService
      .from("profiles")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }

    const { error: metaError } = await supabaseService.auth.admin.updateUserById(
      id,
      {
        user_metadata: {
          name:        profile.name,
          country:     profile.country,
          phone:       profile.phone,
          is_admin:    profile.is_admin,
          is_banned:   profile.is_banned,
          is_verified: profile.is_verified,
        },
      }
    );

    if (metaError) {
      return NextResponse.json({ error: metaError.message }, { status: 400 });
    }

    return NextResponse.json({ profile });

  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}