"use client";
import { useEffect, useState } from "react";
import { AdminTable, SearchBar, FilterChip, StatusBadge, TableSkeleton } from "@/components/admin/ui/AdminUI";

export default function DepositsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("all");
  const [loading,  setLoading]  = useState(true);

  const load = async () => {
  setLoading(true);

  const res = await fetch(`/api/admin/deposits?filter=${filter}`);
  const json = await res.json();

  setSessions(json.data ?? []);
  setFiltered(json.data ?? []);
  setLoading(false);
};


  useEffect(() => { load(); }, [filter]);

  useEffect(() => {
    if (!search) { setFiltered(sessions); return; }
    const q = search.toLowerCase();
    setFiltered(sessions.filter((s) =>
      s.profiles?.name?.toLowerCase().includes(q) ||
      s.coin?.toLowerCase().includes(q) ||
      s.pay_address?.toLowerCase().includes(q)
    ));
  }, [search, sessions]);

  if (loading) return <TableSkeleton rows={8} cols={7} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black mb-0.5">Deposit Sessions</h1>
          <p className="text-sm text-white/40">{filtered.length} sessions</p>
        </div>
        <button onClick={load} className="px-4 py-2 rounded-xl bg-[#111118] border border-white/8 text-sm font-bold hover:border-[#FF7900]/35">
          🔄 Refresh
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search user, coin, address...">
        {["all","pending","completed","failed"].map((f) => (
          <FilterChip key={f} label={f.charAt(0).toUpperCase()+f.slice(1)} active={filter===f} onClick={() => setFilter(f)} />
        ))}
      </SearchBar>

      <AdminTable
        headers={["User","Coin","Network","Amount","Pay Currency","Address","Status","Created"]}
        isEmpty={filtered.length === 0}
        empty="No deposit sessions"
      >
        {filtered.map((s) => (
          <tr key={s.id} className="hover:bg-white/2 transition-colors">
            <td className="px-4 py-3.5">
              <p className="text-sm font-bold">{s.profiles?.name ?? "—"}</p>
              <p className="text-xs text-white/40">{s.profiles?.email ?? "—"}</p>
            </td>
            <td className="px-4 py-3.5 text-sm font-bold">{s.coin}</td>
            <td className="px-4 py-3.5 text-sm text-white/60">{s.network}</td>
            <td className="px-4 py-3.5 text-sm font-bold">{s.pay_amount}</td>
            <td className="px-4 py-3.5 text-sm text-white/60">{s.pay_currency}</td>
            <td className="px-4 py-3.5 text-xs font-mono text-white/40">{s.pay_address?.slice(0, 14)}…</td>
            <td className="px-4 py-3.5"><StatusBadge status={s.status} /></td>
            <td className="px-4 py-3.5 text-xs text-white/40 whitespace-nowrap">
              {new Date(s.created_at).toLocaleString()}
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}