"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Logo } from "@/components/ui";

const navItems = [
  { label: "Dashboard",       href: "/admin",                    icon: "📊" },
  { label: "Users",           href: "/admin/users",              icon: "👥" },
  { label: "Transactions",    href: "/admin/transactions",       icon: "📋" },
  { label: "Deposits",        href: "/admin/deposits",           icon: "⬇️" },
  { label: "Withdrawals",     href: "/admin/withdrawals",        icon: "⬆️", badge: "pending" },
  { label: "Wallets",         href: "/admin/wallets",            icon: "💼" },
  { label: "Staking Plans",   href: "/admin/staking/plans",      icon: "📈" },
  { label: "Staking Positions",href: "/admin/staking/positions", icon: "🔒" },
  { label: "Coin Markets",    href: "/admin/coin-markets",       icon: "🪙" },
  { label: "Notifications",   href: "/admin/notifications",      icon: "🔔" },
];

interface AdminSidebarProps {
  onClose?: () => void;
  pendingWithdrawals?: number;
}

export default function AdminSidebar({ onClose, pendingWithdrawals = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="w-[240px] flex-shrink-0 bg-[#0d0d14] border-r border-white/8 flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <Logo size="sm" />
          <div>
           
            <p className="text-[10px] text-[#FF7900] font-bold uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        {navItems.map((item) => {
          const isActive = item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#FF7900]/15 text-[#FF7900] font-semibold"
                  : "text-white/50 hover:text-white hover:bg-white/4"
              }`}
            >
              <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge === "pending" && pendingWithdrawals > 0 && (
                <span className="bg-[#ff4d6a] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {pendingWithdrawals}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/8">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/4 transition-all mb-1"
        >
          <span className="text-base">🌐</span> View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#ff4d6a] hover:bg-[#ff4d6a]/10 transition-all"
        >
          <span className="text-base">🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}