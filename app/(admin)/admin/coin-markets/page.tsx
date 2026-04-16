"use client";
import { useEffect, useState } from "react";
import { supabaseService } from "@/lib/supabase/service";
import { AdminModal, TableSkeleton } from "@/components/admin/ui/AdminUI";
import type { CoinMarket } from "@/lib/admin/types";

export default function CoinMarketsPage() {
  const [coins,   setCoins]   = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CoinMarket | null>(null);
  const [saving,  setSaving]  = useState(false);

  const load = async () => {
    const { data } = await supabaseService
      .from("coin_markets")
      .select("*")
      .order("market_cap", { ascending: false });
    setCoins(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    await supabaseService
      .from("coin_markets")
      .upsert({ ...editing, updated_at: new Date().toISOString() }, { onConflict: "symbol" });
    await load();
    setEditing(null);
    setSaving(false);
  };

  const set = (key: keyof CoinMarket, val: string | number) =>
    setEditing((prev) => prev ? { ...prev, [key]: val } : prev);

  if (loading) return <TableSkeleton rows={6} cols={7} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black mb-0.5">Coin Markets</h1>
          <p className="text-sm text-white/40">{coins.length} coins tracked</p>
        </div>
        <button
          onClick={() => setEditing({ symbol:"", name:"", icon:"🪙", price:0, change_24h:0, change_7d:0, market_cap:0, volume_24h:0, circulating_supply:0, updated_at: new Date().toISOString() })}
          className="btn-primary max-w-[140px] py-2.5 text-sm"
        >
          + Add Coin
        </button>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8">
              {["Coin","Price","24h","7d","Market Cap","Volume 24h","Updated","Actions"].map((h) => (
                <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-white/35 px-4 py-3.5 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {coins.length === 0 && (
              <tr><td colSpan={8} className="text-center py-12 text-sm text-white/30">No coins found — add one to start tracking</td></tr>
            )}
            {coins.map((coin) => (
              <tr key={coin.symbol} className="hover:bg-white/2 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{coin.icon}</span>
                    <div>
                      <p className="text-sm font-bold">{coin.name}</p>
                      <p className="text-xs text-white/40">{coin.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm font-bold">${(coin.price ?? 0).toLocaleString()}</td>
                <td className={`px-4 py-3.5 text-sm font-bold ${(coin.change_24h ?? 0) >= 0 ? "text-[#00d4aa]" : "text-[#ff4d6a]"}`}>
                  {(coin.change_24h ?? 0) >= 0 ? "▲" : "▼"} {Math.abs(coin.change_24h ?? 0)}%
                </td>
                <td className={`px-4 py-3.5 text-sm font-bold ${(coin.change_7d ?? 0) >= 0 ? "text-[#00d4aa]" : "text-[#ff4d6a]"}`}>
                  {(coin.change_7d ?? 0) >= 0 ? "▲" : "▼"} {Math.abs(coin.change_7d ?? 0)}%
                </td>
                <td className="px-4 py-3.5 text-sm">${(coin.market_cap ?? 0).toLocaleString()}</td>
                <td className="px-4 py-3.5 text-sm">${(coin.volume_24h ?? 0).toLocaleString()}</td>
                <td className="px-4 py-3.5 text-xs text-white/40 whitespace-nowrap">
                  {new Date(coin.updated_at).toLocaleString()}
                </td>
                <td className="px-4 py-3.5">
                  <button
                    onClick={() => setEditing({ ...coin })}
                    className="px-3 py-1.5 rounded-lg bg-[#FF7900]/10 text-[#FF7900] text-xs font-bold hover:bg-[#FF7900]/20 transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add modal */}
      <AdminModal open={!!editing} onClose={() => setEditing(null)} title={editing?.name ? `Edit ${editing.name}` : "Add Coin"}>
        {editing && (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Symbol</label>
                <input type="text" className="field text-sm" placeholder="BTC"
                  value={editing.symbol} onChange={(e) => set("symbol", e.target.value.toUpperCase())} />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Name</label>
                <input type="text" className="field text-sm" placeholder="Bitcoin"
                  value={editing.name} onChange={(e) => set("name", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Icon (emoji)</label>
                <input type="text" className="field text-sm" placeholder="₿"
                  value={editing.icon} onChange={(e) => set("icon", e.target.value)} />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Price (USD)</label>
                <input type="number" className="field text-sm"
                  value={editing.price} onChange={(e) => set("price", Number(e.target.value))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">24h Change (%)</label>
                <input type="number" className="field text-sm" step="0.01"
                  value={editing.change_24h} onChange={(e) => set("change_24h", Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">7d Change (%)</label>
                <input type="number" className="field text-sm" step="0.01"
                  value={editing.change_7d} onChange={(e) => set("change_7d", Number(e.target.value))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Market Cap</label>
                <input type="number" className="field text-sm"
                  value={editing.market_cap} onChange={(e) => set("market_cap", Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Volume 24h</label>
                <input type="number" className="field text-sm"
                  value={editing.volume_24h} onChange={(e) => set("volume_24h", Number(e.target.value))} />
              </div>
            </div>
            <button onClick={save} disabled={saving} className="btn-primary">
              {saving ? "Saving…" : "Save Coin"}
            </button>
          </div>
        )}
      </AdminModal>
    </div>
  );
}