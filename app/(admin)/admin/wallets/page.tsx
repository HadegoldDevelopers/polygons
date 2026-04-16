// ═══════════════════════════════════════════════════════
// app/(admin)/admin/wallets/page.tsx
// ═══════════════════════════════════════════════════════
"use client";
import { useEffect, useState } from "react";
import { supabaseService } from "@/lib/supabase/service";
import { AdminTable, SearchBar, TableSkeleton } from "@/components/admin/ui/AdminUI";

export function WalletsPage() {
  const [wallets,  setWallets]  = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search,   setSearch]   = useState("");
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    supabaseService
      .from("wallets")
      .select("*, profiles(name, email)")
      .order("usd_value", { ascending: false })
      .then(({ data }) => { setWallets(data ?? []); setFiltered(data ?? []); setLoading(false); });
  }, []);

  useEffect(() => {
    if (!search) { setFiltered(wallets); return; }
    const q = search.toLowerCase();
    setFiltered(wallets.filter((w) =>
      w.symbol?.toLowerCase().includes(q) ||
      w.profiles?.name?.toLowerCase().includes(q) ||
      w.profiles?.email?.toLowerCase().includes(q)
    ));
  }, [search, wallets]);

  const totalUSD = wallets.reduce((s, w) => s + (w.usd_value ?? 0), 0);

  if (loading) return <TableSkeleton rows={8} cols={6} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black mb-0.5">Wallet Balances</h1>
          <p className="text-sm text-white/40">
            {filtered.length} wallets · Total: <strong className="text-white">${totalUSD.toLocaleString()}</strong>
          </p>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search user or coin..." />

      <AdminTable headers={["User","Coin","Amount","USD Value","Price","Change","Address"]}>
        {filtered.map((w) => (
          <tr key={w.id} className="hover:bg-white/2 transition-colors">
            <td className="px-4 py-3.5">
              <p className="text-sm font-bold">{w.profiles?.name ?? "—"}</p>
              <p className="text-xs text-white/40">{w.profiles?.email ?? "—"}</p>
            </td>
            <td className="px-4 py-3.5 text-sm font-bold">{w.symbol}</td>
            <td className="px-4 py-3.5 text-sm font-bold">{(w.amount ?? 0).toLocaleString()}</td>
            <td className="px-4 py-3.5 text-sm font-bold text-[#00d4aa]">${(w.usd_value ?? 0).toLocaleString()}</td>
            <td className="px-4 py-3.5 text-sm">${(w.price ?? 0).toLocaleString()}</td>
            <td className={`px-4 py-3.5 text-sm font-bold ${(w.change_pct ?? 0) >= 0 ? "text-[#00d4aa]" : "text-[#ff4d6a]"}`}>
              {(w.change_pct ?? 0) >= 0 ? "▲" : "▼"} {Math.abs(w.change_pct ?? 0)}%
            </td>
            <td className="px-4 py-3.5 text-xs font-mono text-white/40">{w.address?.slice(0, 16)}…</td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}

export default WalletsPage;