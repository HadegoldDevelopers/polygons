// components/dashboard/BalanceHero.tsx
"use client";
import Link from "next/link";

interface Props {
  amount:    number;
  usdValue:  number;
  changePct: number;
  address:   string;
}

export default function BalanceHero({ amount, usdValue, changePct, address }: Props) {
  const isUp = changePct >= 0;

  const copyAddress = () => navigator.clipboard?.writeText(address ?? "");

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#FF7900]/35 p-5 md:p-7 mb-6"
      style={{ background: "linear-gradient(135deg,#1a0f00 0%,#111118 60%,#0a0a0f 100%)" }}
    >
      {/* Glow */}
      <div className="absolute top-[-60px] right-[-60px] w-52 h-52 rounded-full bg-[#FF7900]/10 blur-3xl pointer-events-none" />

      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
        POLYCOGNI CAPITAL Token Balance
      </p>

      {/* Amount */}
      <div className="text-3xl md:text-4xl font-black mb-1" style={{ letterSpacing: "-1.5px" }}>
        {amount.toLocaleString()}{" "}
        <span className="text-[#FF7900] text-xl md:text-2xl">PC</span>
      </div>

      <p className="text-sm text-white/40 mb-6">
        ≈ ${usdValue.toLocaleString()} USD ·{" "}
        <span className={isUp ? "text-[#00d4aa]" : "text-[#ff4d6a]"}>
          {isUp ? "▲" : "▼"} {Math.abs(changePct)}% today
        </span>
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {[
          { label: "⬇ Deposit",  href: "/dashboard/deposit",  primary: true  },
          { label: "⬆ Withdraw", href: "/dashboard/withdraw", primary: false },
          { label: "🔄 Swap",    href: "/dashboard/swap",     primary: false },
        ].map((btn) => (
          <Link
            key={btn.label}
            href={btn.href}
            className={`flex-1 min-w-[90px] py-3 rounded-xl text-sm font-bold text-center transition-all ${
              btn.primary
                ? "bg-[#FF7900] text-black hover:bg-[#ff8c1a]"
                : "bg-[#1a1a24] border border-white/8 hover:border-[#FF7900]/35"
            }`}
          >
            {btn.label}
          </Link>
        ))}
        <button
          onClick={copyAddress}
          className="flex-1 min-w-[90px] py-3 rounded-xl text-sm font-bold bg-[#1a1a24] border border-white/8 hover:border-[#FF7900]/35 transition-all"
        >
          📋 Copy Address
        </button>
      </div>
    </div>
  );
}
