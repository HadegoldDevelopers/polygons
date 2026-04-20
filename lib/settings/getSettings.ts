import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function getPaymentSettings() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) {
    console.error("Failed to load NOWPayments settings:", error);
    return null;
  }

  return data;
}
