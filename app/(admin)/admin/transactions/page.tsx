"use client";
import { useEffect, useState } from "react";
import { AdminTable, SearchBar, FilterChip, StatusBadge, TableSkeleton } from "@/components/admin/ui/AdminUI";
import type { AdminTransaction } from "@/lib/admin/types";

const PAGE_SIZE = 20;

export default function TransactionsPage() {
  const [txs,      setTxs]      = useState<AdminTransaction[]>([]);
  const [filtered, setFiltered] = useState<AdminTransaction[]>([]);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("all");
  const [page,     setPage]     = useState(0);
  const [total,    setTotal]    = useState(0);
  const [loading,  setLoading]  = useState(true);

  const load = async (p = 0, type = "all") => {
  setLoading(true);

  const res = await fetch(`/api/admin/transactions?page=${p}&filter=${type}`);
  const json = await res.json();

  setTxs(json.data ?? []);
  setFiltered(json.data ?? []);
  setTotal(json.count ?? 0);
  setPage(p);
  setLoading(false);
};


  useEffect(() => { load(0, filter); }, [filter]);

  useEffect(() => {
    if (!search) { setFiltered(txs); return; }
    const q = search.toLowerCase();
    setFiltered(txs.filter((t) =>
      t.hash?.toLowerCase().includes(q) ||
      t.coin?.toLowerCase().includes(q) ||
      (t.profiles as any)?.email?.toLowerCase().includes(q) ||
      (t.profiles as any)?.name?.toLowerCase().includes(q)
    ));
  }, [search, txs]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (loading) return <TableSkeleton rows={10} cols={7} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black mb-0.5">Transactions</h1>
          <p className="text-sm text-white/40">{total.toLocaleString()} total transactions</p>
        </div>
        <button
          onClick={() => load(0, filter)}
          className="px-4 py-2 rounded-xl bg-[#111118] border border-white/8 text-sm font-bold hover:border-[#FF7900]/35 transition-colors"
        >
          🔄 Refresh
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search hash, coin, user...">
        {["all","Deposit","Withdraw","Swap","Staking"].map((f) => (
          <FilterChip key={f} label={f} active={filter===f} onClick={() => setFilter(f)} />
        ))}
      </SearchBar>

      <AdminTable
        headers={["User","Type","Coin","Amount","USD","Hash","Status","Date"]}
        isEmpty={filtered.length === 0}
      >
        {filtered.map((tx) => (
          <tr key={tx.id} className="hover:bg-white/2 transition-colors">
            <td className="px-4 py-3.5">
              <p className="text-sm font-bold">{(tx.profiles as any)?.name ?? "—"}</p>
              <p className="text-xs text-white/40">{(tx.profiles as any)?.email ?? tx.user_id?.slice(0, 8)+"…"}</p>
            </td>
            <td className="px-4 py-3.5 text-sm font-bold">{tx.type}</td>
            <td className="px-4 py-3.5 text-sm">{tx.coin}</td>
            <td className={`px-4 py-3.5 text-sm font-bold ${tx.direction === "in" ? "text-[#00d4aa]" : "text-[#ff4d6a]"}`}>
              {tx.direction === "in" ? "+" : "-"}{Math.abs(tx.amount ?? 0).toLocaleString()}
            </td>
            <td className="px-4 py-3.5 text-sm">${(tx.usd ?? 0).toLocaleString()}</td>
            <td className="px-4 py-3.5">
              <span className="text-xs font-mono text-[#FF7900]">{tx.hash?.slice(0,12) ?? "—"}…</span>
            </td>
            <td className="px-4 py-3.5"><StatusBadge status={tx.status} /></td>
            <td className="px-4 py-3.5 text-xs text-white/40 whitespace-nowrap">
              {new Date(tx.created_at).toLocaleString()}
            </td>
          </tr>
        ))}
      </AdminTable>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-white/40">Page {page + 1} of {totalPages}</p>
          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => load(page - 1, filter)}
              className="px-4 py-2 rounded-xl bg-[#111118] border border-white/8 text-sm font-bold disabled:opacity-30 hover:border-[#FF7900]/35 transition-colors"
            >
              ← Prev
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => load(page + 1, filter)}
              className="px-4 py-2 rounded-xl bg-[#111118] border border-white/8 text-sm font-bold disabled:opacity-30 hover:border-[#FF7900]/35 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}