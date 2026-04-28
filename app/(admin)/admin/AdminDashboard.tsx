"use client";
import { useEffect, useState } from "react";
import { StatusBadge, AdminStatCard, TableSkeleton  } from "@/components/admin/ui/AdminUI";
import type { AnalyticsStats, AdminTransaction } from "@/lib/admin/types";

export default function AdminDashboard() {
  const [stats,     setStats]     = useState<AnalyticsStats | null>(null);
  const [recentTx,  setRecentTx]  = useState<AdminTransaction[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
  const load = async () => {
    const res = await fetch("/api/admin/dashboard");
    const data = await res.json();

    setStats(data.stats);
    setRecentTx(data.recentTx);
    setLoading(false);
  };

  load();
}, []);

  if (loading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="h-28 bg-white/6 rounded-2xl" />)}
        </div>
        <TableSkeleton rows={6} cols={5} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-black mb-1">Overview</h1>
        <p className="text-sm text-white/40">Platform analytics and activity</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AdminStatCard icon="👥" label="Total Users"          value={stats?.totalUsers ?? 0}                               sub={`+${stats?.newUsersToday} today`} />
        <AdminStatCard icon="💰" label="Total Volume (USD)"   value={`$${(stats?.totalVolume ?? 0).toLocaleString()}`}     color="#00d4aa" />
        <AdminStatCard icon="⬇️" label="Total Deposits"       value={`$${(stats?.totalDeposits ?? 0).toLocaleString()}`}   color="#00d4aa" />
        <AdminStatCard icon="⬆️" label="Total Withdrawals"    value={`$${(stats?.totalWithdrawals ?? 0).toLocaleString()}`}color="#627eea" />
        <AdminStatCard icon="⏳" label="Pending Withdrawals"  value={stats?.pendingWithdrawals ?? 0}                       color="#ff4d6a" sub="Needs review" />
        <AdminStatCard icon="🔒" label="Active Stakes"        value={stats?.activeStakes ?? 0}                             color="#FF7900" />
        <AdminStatCard icon="💎" label="Total Staked (USD)"   value={`$${(stats?.totalStaked ?? 0).toLocaleString()}`}     color="#FF7900" />
        <AdminStatCard icon="📈" label="New Users Today"      value={stats?.newUsersToday ?? 0}                            color="#00d4aa" />
      </div>

      {/* Recent transactions */}
      <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-x-auto">
        <div className="px-5 py-4 border-b border-white/8">
          <h3 className="text-sm font-bold">Recent Transactions</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8">
              {["User","Type","Coin","Amount","USD","Status","Date"].map((h) => (
                <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-white/35 px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {recentTx.map((tx) => (
              <tr key={tx.id} className="hover:bg-white/2 transition-colors">
                <td className="px-4 py-3 text-xs font-mono text-white/40">{tx.user_id?.slice(0, 8)}…</td>
                <td className="px-4 py-3 text-sm font-bold">{tx.type}</td>
                <td className="px-4 py-3 text-sm">{tx.coin}</td>
                <td className={`px-4 py-3 text-sm font-bold ${tx.direction === "in" ? "text-[#00d4aa]" : "text-[#ff4d6a]"}`}>
                  {tx.direction === "in" ? "+" : "-"}{Math.abs(tx.amount ?? 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm">${(tx.usd ?? 0).toLocaleString()}</td>
                <td className="px-4 py-3"><StatusBadge status={tx.status} /></td>
                <td className="px-4 py-3 text-xs text-white/40 whitespace-nowrap">
                  {new Date(tx.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}