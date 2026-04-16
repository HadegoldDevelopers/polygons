"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeading, StatCard } from "@/components/ui";

interface Asset {
  symbol: string;
  price: number;
  change_24h: number;
  amount: number;
  value_usd: number;
  pct: number;
  color: string;
}

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [totalUSD, setTotalUSD] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/user/portfolio");
        const data = await res.json();

        setAssets(data.assets || []);
        setTotalUSD(data.totalUSD || 0);
      } catch (err) {
        console.error("Portfolio load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 text-white/30">
        <div className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin mx-auto mb-3" />
        Loading portfolio…
      </div>
    );
  }

  return (
    <div>
      <PageHeading title="Portfolio" subtitle="Overview of all your assets." />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon="💼"
          value={`$${totalUSD.toLocaleString("en", { maximumFractionDigits: 0 })}`}
          label="Total Portfolio Value"
          change="24h"
          changeDir="up"
        />

        <StatCard
          icon="📈"
          value="$0"
          label="Total Profit"
          change="All time"
          changeDir="up"
        />

        <StatCard icon="🎯" value={assets.length} label="Assets Held" />
      </div>

      {/* Allocation */}
      <div className="card mb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-5">
          Asset Allocation
        </p>

        {/* Allocation bar */}
        <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-4">
  {assets.map((a) => (
    <div
      key={a.symbol}
      style={{
        width: `${a.pct}%`,
        background: a.color,
      }}
    />
  ))}
</div>


        {/* Allocation legend */}
        <div className="flex gap-5 flex-wrap">
  {assets.map((a) => (
    <div key={a.symbol} className="flex items-center gap-2 text-sm">
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: a.color }}
      />
      <span className="text-white/60">{a.symbol}</span>
      <span className="font-bold">{a.pct.toFixed(1)}%</span>
    </div>
  ))}
</div>

      </div>

      {/* Assets Table */}
      <div className="card p-0 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8">
              {[
                "Asset",
                "Price",
                "24h Change",
                "Holdings",
                "Value (USD)",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-[10px] font-bold uppercase tracking-widest text-white/35 px-5 py-4"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/8">
            {assets.map((coin) => (
              <tr key={coin.symbol} className="hover:bg-white/2 transition-colors">
                {/* Asset */}
                <td className="px-5 py-4">
                  <p className="text-sm font-bold">{coin.symbol}</p>
                </td>

                {/* Price */}
                <td className="px-5 py-4 text-sm font-semibold">
                  ${coin.price.toLocaleString()}
                </td>

                {/* 24h Change */}
                <td
                  className={`px-5 py-4 text-sm font-bold ${
                    coin.change_24h >= 0 ? "text-[#00d4aa]" : "text-[#ff4d6a]"
                  }`}
                >
                  {coin.change_24h >= 0 ? "▲" : "▼"} {Math.abs(coin.change_24h)}%
                </td>

                {/* Holdings */}
                <td className="px-5 py-4 text-sm font-semibold">
                  {coin.amount.toLocaleString()} {coin.symbol}
                </td>

                {/* USD Value */}
                <td className="px-5 py-4 text-sm font-bold">
                  ${coin.value_usd.toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                </td>

                {/* Action */}
                <td className="px-5 py-4">
                  <Link href="/dashboard/swap">
                    <button className="btn-ghost text-xs px-3 py-1.5 rounded-lg">
                      Swap
                    </button>
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
