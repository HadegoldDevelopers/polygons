"use client";

import type { CoinMarket } from "@/lib/admin/types";
import { CoinMarketRow } from "./CoinMarketRow";

export function CoinMarketsTable({
  coins,
  onEdit,
}: {
  coins: CoinMarket[];
  onEdit: (coin: CoinMarket) => void;
}) {
  return (
    <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/8">
            {["Coin","Price","24h","7d","Market Cap","Volume 24h","Updated","Actions"].map(h => (
              <th
                key={h}
                className="text-left text-[10px] font-bold uppercase tracking-widest text-white/35 px-4 py-3.5 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {coins.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="text-center py-12 text-sm text-white/30"
              >
                No coins found — add one to start tracking
              </td>
            </tr>
          )}
          {coins.map(coin => (
            <CoinMarketRow key={coin.symbol} coin={coin} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
