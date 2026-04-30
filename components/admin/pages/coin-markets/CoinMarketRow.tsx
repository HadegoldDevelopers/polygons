"use client";

import type { CoinMarket } from "@/lib/admin/types";

export function CoinMarketRow({
  coin,
  onEdit,
}: {
  coin: CoinMarket;
  onEdit: (coin: CoinMarket) => void;
}) {
  return (
    <tr className="hover:bg-white/2 transition-colors">
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{coin.icon}</span>
          <div>
            <p className="text-sm font-bold">{coin.name}</p>
            <p className="text-xs text-white/40">{coin.symbol}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm font-bold">
        ${(coin.price ?? 0).toLocaleString()}
      </td>
      <td
        className={`px-4 py-3.5 text-sm font-bold ${
          (coin.change_24h ?? 0) >= 0 ? "text-[#00d4aa]" : "text-[#ff4d6a]"
        }`}
      >
        {(coin.change_24h ?? 0) >= 0 ? "▲" : "▼"}{" "}
        {Math.abs(coin.change_24h ?? 0)}%
      </td>
      <td
        className={`px-4 py-3.5 text-sm font-bold ${
          (coin.change_7d ?? 0) >= 0 ? "text-[#00d4aa]" : "text-[#ff4d6a]"
        }`}
      >
        {(coin.change_7d ?? 0) >= 0 ? "▲" : "▼"}{" "}
        {Math.abs(coin.change_7d ?? 0)}%
      </td>
      <td className="px-4 py-3.5 text-sm">
        ${(coin.market_cap ?? 0).toLocaleString()}
      </td>
      <td className="px-4 py-3.5 text-sm">
        ${(coin.volume_24h ?? 0).toLocaleString()}
      </td>
      <td className="px-4 py-3.5 text-xs text-white/40 whitespace-nowrap">
        {new Date(coin.updated_at).toLocaleString()}
      </td>
      <td className="px-4 py-3.5">
        <button
          onClick={() => onEdit(coin)}
          className="px-3 py-1.5 rounded-lg bg-[#FF7900]/10 text-[#FF7900] text-xs font-bold hover:bg-[#FF7900]/20 transition-colors"
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
