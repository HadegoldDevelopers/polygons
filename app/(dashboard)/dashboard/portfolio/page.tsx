"use client";
import Link from "next/link";
import { PageHeading, StatCard } from "@/components/ui";
import { coins } from "@/lib/mockData";

export default function PortfolioPage() {
  const totalUSD = coins.reduce((sum, c) => sum + c.balance * c.price, 0);

  return (
    <div>
      <PageHeading title="Portfolio" subtitle="Overview of all your assets." />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon="💼" value={`$${totalUSD.toLocaleString("en",{maximumFractionDigits:0})}`} label="Total Portfolio Value" change="4.2%" changeDir="up" />
        <StatCard icon="📈" value="$3,240"  label="Total Profit"  change="All time" changeDir="up" />
        <StatCard icon="🎯" value={coins.length} label="Assets Held" />
      </div>

      {/* Asset allocation visual */}
      <div className="card mb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-5">Asset Allocation</p>
        <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-4">
          {[
            { color: "#FF7900", pct: 75 },
            { color: "#f7931a", pct: 13 },
            { color: "#627eea", pct: 10 },
            { color: "#26a17b", pct: 2  },
          ].map((seg, i) => (
            <div key={i} style={{ width: `${seg.pct}%`, background: seg.color }} />
          ))}
        </div>
        <div className="flex gap-5 flex-wrap">
          {[
            { label:"PLUTO", color:"#FF7900", pct:"75%" },
            { label:"BTC",   color:"#f7931a", pct:"13%" },
            { label:"ETH",   color:"#627eea", pct:"10%" },
            { label:"USDT",  color:"#26a17b", pct:"2%"  },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-sm">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
              <span className="text-white/60">{l.label}</span>
              <span className="font-bold">{l.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Assets table */}
      <div className="card p-0 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8">
              {["Asset","Price","24h Change","Holdings","Value (USD)","Action"].map((h) => (
                <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-white/35 px-5 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {coins.map((coin) => (
              <tr key={coin.symbol} className="hover:bg-white/2 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-black"
                      style={{ background: `${coin.color}20`, color: coin.color }}
                    >
                      {coin.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{coin.name}</p>
                      <p className="text-xs text-white/40">{coin.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm font-semibold">
                  ${coin.price.toLocaleString()}
                </td>
                <td className={`px-5 py-4 text-sm font-bold ${
                  coin.symbol === "ETH" ? "text-[#ff4d6a]" : "text-[#00d4aa]"
                }`}>
                  {coin.symbol === "ETH" ? "▼ 1.3%" : coin.symbol === "USDT" ? "0.0%" : "▲ " + (coin.symbol === "PLUTO" ? "4.46%" : coin.symbol === "BTC" ? "2.1%" : "0%")}
                </td>
                <td className="px-5 py-4 text-sm font-semibold">
                  {coin.balance.toLocaleString()} {coin.symbol}
                </td>
                <td className="px-5 py-4 text-sm font-bold">
                  ${(coin.balance * coin.price).toLocaleString("en", { maximumFractionDigits: 2 })}
                </td>
                <td className="px-5 py-4">
                  <Link href="/dashboard/swap">
                    <button className="btn-ghost text-xs px-3 py-1.5 rounded-lg">Swap</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
