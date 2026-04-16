"use client";
import { useEffect, useState } from "react";
import { supabaseService } from "@/lib/supabase/service";
import { AdminTable, SearchBar, FilterChip, StatusBadge, TableSkeleton } from "@/components/admin/ui/AdminUI";

export default function StakingPositionsPage() {
  const [positions, setPositions] = useState<any[]>([]);
  const [filtered,  setFiltered]  = useState<any[]>([]);
  const [search,    setSearch]    = useState("");
  const [filter,    setFilter]    = useState("active");
  const [loading,   setLoading]   = useState(true);

  const load = async () => {
    let q = supabaseService
      .from("staking_positions")
      .select("*, profiles(name, email), staking_plans(name, apr)")
      .order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    setPositions(data ?? []);
    setFiltered(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  useEffect(() => {
    if (!search) { setFiltered(positions); return; }
    const q = search.toLowerCase();
    setFiltered(positions.filter((p) =>
      p.profiles?.name?.toLowerCase().includes(q) ||
      p.profiles?.email?.toLowerCase().includes(q) ||
      p.staking_plans?.name?.toLowerCase().includes(q)
    ));
  }, [search, positions]);

  const totalStaked = positions.reduce((s, p) => s + (p.amount ?? 0), 0);
  const totalEarned = positions.reduce((s, p) => s + (p.earned ?? 0), 0);

  if (loading) return <TableSkeleton rows={8} cols={7} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black mb-0.5">Staking Positions</h1>
          <p className="text-sm text-white/40">
            {positions.length} positions ·
            Staked: <strong className="text-white">${totalStaked.toLocaleString()}</strong> ·
            Earned: <strong className="text-[#00d4aa]">${totalEarned.toLocaleString()}</strong>
          </p>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search user or plan...">
        {["active","completed","all"].map((f) => (
          <FilterChip key={f} label={f.charAt(0).toUpperCase()+f.slice(1)} active={filter===f} onClick={() => setFilter(f)} />
        ))}
      </SearchBar>

      <AdminTable
        headers={["User","Plan","Amount","Earned","APY","Days Left","Progress","Status","Started"]}
        isEmpty={filtered.length === 0}
      >
        {filtered.map((pos) => (
          <tr key={pos.id} className="hover:bg-white/2 transition-colors">
            <td className="px-4 py-3.5">
              <p className="text-sm font-bold">{pos.profiles?.name ?? "—"}</p>
              <p className="text-xs text-white/40">{pos.profiles?.email ?? "—"}</p>
            </td>
            <td className="px-4 py-3.5 text-sm font-bold">{pos.staking_plans?.name ?? "—"}</td>
            <td className="px-4 py-3.5 text-sm font-bold">${(pos.amount ?? 0).toLocaleString()}</td>
            <td className="px-4 py-3.5 text-sm font-bold text-[#00d4aa]">+${(pos.earned ?? 0).toLocaleString()}</td>
            <td className="px-4 py-3.5 text-sm text-[#FF7900] font-bold">{pos.apy ?? pos.staking_plans?.apr ?? 0}%</td>
            <td className="px-4 py-3.5 text-sm">{pos.days_left ?? 0}d</td>
            <td className="px-4 py-3.5">
              <div className="w-20 h-1.5 bg-white/10 rounded-full">
                <div className="h-full bg-[#FF7900] rounded-full" style={{ width: `${pos.progress ?? 0}%` }} />
              </div>
              <p className="text-[10px] text-white/40 mt-1">{pos.progress ?? 0}%</p>
            </td>
            <td className="px-4 py-3.5"><StatusBadge status={pos.status ?? "active"} /></td>
            <td className="px-4 py-3.5 text-xs text-white/40 whitespace-nowrap">
              {new Date(pos.created_at).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}