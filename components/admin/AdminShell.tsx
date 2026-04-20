"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/nav/AdminSidebar";
import AdminTopbar from "@/components/admin/nav/AdminTopbar";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/users": "User Management",
  "/admin/transactions": "Transactions",
  "/admin/deposits": "Deposit Sessions",
  "/admin/withdrawals": "Withdrawal Requests",
  "/admin/wallets": "Wallet Balances",
  "/admin/staking/plans": "Staking Plans",
  "/admin/staking/positions": "Staking Positions",
  "/admin/coin-markets": "Coin Markets",
  "/admin/notifications": "Send Notifications",
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Admin";

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-5 md:p-6">
          <div className="max-w-[1200px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
