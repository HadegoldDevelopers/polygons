"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui";

const navItems = [
  { label: "Dashboard",    href: "/dashboard",             icon: "🏠" },
  { label: "Deposit",      href: "/dashboard/deposit",     icon: "⬇️" },
  { label: "Withdraw",     href: "/dashboard/withdraw",    icon: "⬆️" },
  { label: "Swap",         href: "/dashboard/swap",        icon: "🔄" },
  { label: "Transactions", href: "/dashboard/transactions",icon: "📋", badge: "3" },
];

const portfolioItems = [
  { label: "Portfolio",    href: "/dashboard/portfolio",   icon: "💼" },
  { label: "Staking",      href: "/dashboard/staking",     icon: "🪙" },
  { label: "Referral",     href: "/dashboard/referral",    icon: "🎁" },
];

const accountItems = [
  { label: "Settings",     href: "/dashboard/settings",    icon: "⚙️" },
  { label: "Security",     href: "/dashboard/security",    icon: "🔒" },
  { label: "Help Center",  href: "/dashboard/help",        icon: "❓" },
];

export default function Sidebar({ onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const NavLink = ({ item }) => {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={`nav-item ${active ? "active" : ""}`}
      >
        <span className="text-lg w-5 text-center flex-shrink-0">{item.icon}</span>
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="bg-[#FF7900] text-black text-[10px] font-black px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="w-[260px] flex-shrink-0 bg-[#111118] border-r border-white/8 flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/8">
        <Logo size="sm" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-bold tracking-[1.2px] uppercase text-white/30 px-2.5 mb-2 mt-2">Main</p>
        {navItems.map((item) => <NavLink key={item.href} item={item} />)}

        <p className="text-[10px] font-bold tracking-[1.2px] uppercase text-white/30 px-2.5 mb-2 mt-5">Portfolio</p>
        {portfolioItems.map((item) => <NavLink key={item.href} item={item} />)}

        <p className="text-[10px] font-bold tracking-[1.2px] uppercase text-white/30 px-2.5 mb-2 mt-5">Account</p>
        {accountItems.map((item) => <NavLink key={item.href} item={item} />)}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 border-t border-white/8">
        <Link href="/dashboard/settings" onClick={onClose} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/4 transition-colors mb-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF7900] to-[#ff4d6a] flex items-center justify-center text-sm font-black text-black flex-shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">John Doe</p>
            <p className="text-[11px] text-white/40 truncate">demo@plutochain.io</p>
          </div>
        </Link>
        <button
          onClick={() => router.push("/login")}
          className="nav-item w-full text-[#ff4d6a] hover:bg-[#ff4d6a]/10"
        >
          <span className="text-lg w-5 text-center flex-shrink-0">🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
