import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  // Protect admin routes
  if (!user) redirect("/login");

  return <AdminShell>{children}</AdminShell>;
}
