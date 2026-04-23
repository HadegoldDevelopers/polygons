// components/dashboard/QuickActions.tsx
"use client";
import Link from "next/link";

const ACTIONS = [
  { icon: "⬇️", label: "Deposit",  href: "/dashboard/deposit"  },
  { icon: "⬆️", label: "Withdraw", href: "/dashboard/withdraw" },
  { icon: "🔄", label: "Swap",     href: "/dashboard/swap"     },
  { icon: "🔒", label: "Stake",    href: "/dashboard/staking"  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6">
      {ACTIONS.map((a) => (
        <Link
          key={a.label}
          href={a.href}
          className="bg-[#111118] border border-white/8 rounded-xl py-3 md:py-4 text-center hover:border-[#FF7900]/35 hover:bg-[#FF7900]/8 transition-all active:scale-95"
        >
          <div className="text-xl md:text-2xl mb-1 md:mb-1.5">{a.icon}</div>
          <div className="text-[10px] md:text-[11px] font-bold text-white/45">{a.label}</div>
        </Link>
      ))}
    </div>
  );
}
