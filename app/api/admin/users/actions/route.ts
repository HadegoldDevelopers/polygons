import { supabaseService } from "@/lib/supabase/service";
import type { AdminProfile } from "@/lib/admin/types";

type ActionType = "ban" | "unban" | "verify" | "is_admin"

interface ActionRequest {
  action: ActionType;
  userId: AdminProfile["id"];
  payload?: {
    reason?: string;
    value?: boolean;
    is_admin?: boolean;
  };
}

type ProfileUpdate = Partial<
  Pick<
    AdminProfile,
    "is_banned" | "banned_at" | "ban_reason" | "is_verified" | "is_admin"
  >
>;

export async function POST(req: Request) {
  try {
    const body: ActionRequest = await req.json();
    const { action, userId, payload } = body;

    if (!userId || !action) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    let updateData: ProfileUpdate = {};

    switch (action) {
      case "ban":
        updateData = {
          is_banned: true,
          ban_reason: payload?.reason ?? "No reason provided",
          banned_at: new Date().toISOString(),
        };
        break;

      case "unban":
        updateData = {
          is_banned: false,
        };
        break;

      case "verify":
        updateData = {
          is_verified: payload?.value,
        };
        break;

      case "is_admin":
        updateData = {
          is_admin: payload?.is_admin,
        };
        break; 

      default:
        return Response.json({ error: "Unknown action" }, { status: 400 });
    }

    const { error } = await supabaseService
      .from("profiles")
      .update(updateData)
      .eq("id", userId);

    if (error) throw error;

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Action failed" }, { status: 500 });
  }
}