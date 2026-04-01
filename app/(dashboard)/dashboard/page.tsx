"use client";
import Link from "next/link";
import { StatCard, Badge, PageHeading } from "@/components/ui";
import { balances, transactions, staking } from "@/lib/mockData";

const portfolio = [
  { symbol: "PLUTO", name: "PlutoChain", icon: "🪙", iconBg: "bg-[#FF7900]/15", iconColor: "text-[#FF7900]", amount: "48,290 PLUTO", usd: "$9,658.00", change: "+4.46%", up: true },
  { symbol: "BTC",   name: "Bitcoin",    icon: "₿",  iconBg: "bg-[#f7931a]/15", iconColor: "text-[#f7931a]", amount: "0.0421 BTC",   usd: "$2,841.75", change: "+2.1%",  up: true },
  { symbol: "ETH",   name: "Ethereum",   icon: "Ξ",  iconBg: "bg-[#627eea]/15", iconColor: "text-[#627eea]", amount: "0.892 ETH",    usd: "$3,460.96", change: "-1.3%",  up: false },
  { symbol: "USDT",  name: "Tether",     icon: "$",  iconBg: "bg-[#26a17b]/15", iconColor: "text-[#26a17b]", amount: "100.00 USDT",  usd: "$100.00",   change: "0.0%",   up: true  },
];

const recentTx = transactions.slice(0, 3);
const txIcons = { Deposit: "⬇", Withdraw: "⬆", Swap: "🔄", Staking: "🪙" };
const txBg    = { Deposit: "bg-[#00d4aa]/10", Withdraw: "bg-[#ff4d6a]/10", Swap: "bg-[#FF7900]/10", Staking: "bg-[#FF7900]/10" };

export default function DashboardPage() {
  return (
    <div>
      <PageHeading
        title="Good morning, John 👋"
        subtitle="Here's what's happening with your portfolio today."
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="💰" value="$12,847" label="Total Balance (USD)"   change="4.2% today"     changeDir="up" />
        <StatCard icon="🪙" value="48,290"  label="PLUTO Holdings"        change="12.7% this week" changeDir="up" />
        <StatCard icon="📈" value="$3,240"  label="Total Profit / Loss"   change="All time"        changeDir="up" />
        <StatCard icon="🔄" value="47"      label="Total Transactions"    change="3 pending"       changeDir="down" />
      </div>

      {/* Balance hero card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#FF7900]/35 p-7 mb-6"
        style={{ background: "linear-gradient(135deg,#1a0f00 0%,#111118 60%,#0a0a0f 100%)" }}>
        <div className="absolute top-[-60px] right-[-60px] w-52 h-52 rounded-full bg-[#FF7900]/10 blur-3xl pointer-events-none" />
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">PLUTO Token Balance</p>
        <div className="text-4xl font-black mb-1" style={{ letterSpacing: "-1.5px" }}>
          48,290 <span className="text-[#FF7900] text-2xl">PLUTO</span>
        </div>
        <p className="text-sm text-white/40 mb-6">
          ≈ $9,658.00 USD ·{" "}
          <span className="text-[#00d4aa]">▲ $412.30 (4.46%)</span> today
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "⬇ Deposit",       href: "/dashboard/deposit",      primary: true },
            { label: "⬆ Withdraw",      href: "/dashboard/withdraw",     primary: false },
            { label: "🔄 Swap",          href: "/dashboard/swap",         primary: false },
            { label: "📋 Copy Address",  href: null,                      primary: false, copy: true },
          ].map((btn) =>
            btn.href ? (
              <Link
                key={btn.label}
                href={btn.href}
                className={`flex-1 min-w-[100px] py-3 rounded-xl text-sm font-bold text-center transition-all ${
                  btn.primary
                    ? "bg-[#FF7900] text-black hover:bg-[#ff8c1a]"
                    : "bg-[#1a1a24] border border-white/8 hover:border-[#FF7900]/35"
                }`}
              >
                {btn.label}
              </Link>
            ) : (
              <button
                key={btn.label}
                onClick={() => navigator.clipboard?.writeText("0x1f385578266496cd4a4c435a6bb2a60b9bd9ceef")}
                className="flex-1 min-w-[100px] py-3 rounded-xl text-sm font-bold bg-[#1a1a24] border border-white/8 hover:border-[#FF7900]/35 transition-all"
              >
                {btn.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { icon: "⬇️", label: "Deposit",  href: "/dashboard/deposit"  },
          { icon: "⬆️", label: "Withdraw", href: "/dashboard/withdraw" },
          { icon: "🔄", label: "Swap",     href: "/dashboard/swap"     },
          { icon: "💳", label: "Buy",      href: "/dashboard/deposit"  },
        ].map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="bg-[#111118] border border-white/8 rounded-xl py-4 text-center hover:border-[#FF7900]/35 hover:bg-[#FF7900]/8 transition-all"
          >
            <div className="text-2xl mb-1.5">{a.icon}</div>
            <div className="text-[11px] font-bold text-white/45">{a.label}</div>
          </Link>
        ))}
      </div>

      {/* Portfolio + Right col */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">
        {/* Portfolio */}
        <div className="card">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">My Portfolio</p>
          <div className="divide-y divide-white/8">
            {portfolio.map((coin) => (
              <div key={coin.symbol} className="flex items-center gap-3 py-3.5">
                <div className={`w-10 h-10 rounded-full ${coin.iconBg} ${coin.iconColor} flex items-center justify-center text-lg font-black flex-shrink-0`}>
                  {coin.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{coin.name}</p>
                  <p className="text-xs text-white/40">{coin.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{coin.amount}</p>
                  <p className="text-xs text-white/40">{coin.usd}</p>
                  <p className={`text-[11px] font-bold ${coin.up ? "text-[#00d4aa]" : "text-[#ff4d6a]"}`}>
                    {coin.up ? "▲" : "▼"} {coin.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Staking summary */}
          <div className="card">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">Staking Rewards</p>
            <div className="flex items-center gap-4">
              {/* Ring */}
              <div className="relative flex-shrink-0">
                <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#FF7900" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="213.6"
                    strokeDashoffset={213.6 * (1 - staking.apy / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xl font-black">{staking.apy}%</p>
                  <p className="text-[9px] text-white/40 font-bold">APY</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Staked</p>
                <p className="text-lg font-black">{staking.staked.toLocaleString()} PLUTO</p>
                <p className="text-xs text-white/40 mt-1">
                  Earned: <span className="text-[#00d4aa] font-bold">+{staking.earned.toLocaleString()} PLUTO</span>
                </p>
                <Link href="/dashboard/staking">
                  <button className="btn-ghost text-xs px-3 py-1.5 mt-3 rounded-lg">Manage →</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Recent Activity</p>
              <Link href="/dashboard/transactions" className="text-xs text-[#FF7900] font-bold hover:underline">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-white/8">
              {recentTx.map((tx) => (
                <div key={tx.id} className="flex items-center gap-3 py-3">
                  <div className={`w-9 h-9 rounded-xl ${txBg[tx.type]} flex items-center justify-center text-base flex-shrink-0`}>
                    {txIcons[tx.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold">{tx.type}</p>
                    <p className="text-xs text-white/40">{tx.date.split(" ")[0]}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${tx.dir === "in" ? "text-[#00d4aa]" : "text-[#ff4d6a]"}`}>
                      {tx.dir === "in" ? "+" : ""}{tx.amount.toLocaleString()} {tx.coin}
                    </p>
                    <Badge status={tx.status as "confirmed" | "pending" | "failed"} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
