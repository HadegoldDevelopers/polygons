import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import DashboardShell from "./DashboardShell";

export const metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Polycogni Capital",
  },
  description: "Your Polycogni Capital dashboard.",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode  }) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
 
  if (!user) {
    redirect("/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
