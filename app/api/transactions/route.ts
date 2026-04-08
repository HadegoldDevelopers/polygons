import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  // FIX: await the server client
  const supabase = await supabaseServer();

  // Get authenticated user
  const { data: auth, error: authError } = await supabase.auth.getUser();

  if (authError || !auth?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = auth.user.id;

  // Fetch unified transactions
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Transaction fetch error:", error);
    return NextResponse.json({ error: "Failed to load transactions" }, { status: 500 });
  }

  return NextResponse.json(data || []);
}
