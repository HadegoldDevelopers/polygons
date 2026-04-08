"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { ToastProvider } from "@/context/ToastContext";

const pageTitles = {
  "/dashboard":               "Dashboard",
  "/dashboard/deposit":       "Deposit",
  "/dashboard/withdraw":      "Withdraw",
  "/dashboard/swap":          "Swap",
  "/dashboard/transactions":  "Transactions",
  "/dashboard/portfolio":     "Portfolio",
  "/dashboard/staking":       "Staking",
  "/dashboard/settings":      "Settings",
  "/dashboard/security":      "Security",
  "/dashboard/referral":      "Referral Program",
  "/dashboard/help":          "Help Center",
} as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title =
  pathname in pageTitles
    ? pageTitles[pathname as keyof typeof pageTitles]
    : "Dashboard";
    
  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — fixed on mobile, static on desktop */}
        <div className={`fixed md:static inset-y-0 left-0 z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
         <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar title={title} onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto bg-[#0a0a0f] p-6 md:p-7">
            <div className="max-w-[1100px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
