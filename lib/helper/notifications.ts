import { supabaseService } from "@/lib/supabase/service";

export async function createNotification(user_id: string, text: string) {
  return await supabaseService.from("notifications").insert({
    user_id,
    text,
    time: new Date(),
    read: false,
  });
}
