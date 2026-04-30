"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminPlanPosition } from "@/lib/admin/types";

type StatusFilter = "all" | "active" | "completed" | "cancelled";
type SortKey = "created_at" | "amount" | "end_date";

export default function AdminPlansPage() {
  const [positions, setPositions] = useState<AdminPlanPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [editing, setEditing] = useState<AdminPlanPosition | null>(null);
  const [saving, setSaving] = useState(false);

  // Load all plan positions
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch("/api/admin/plans", { cache: "no-store" });
      const json = await res.json();
      setPositions(json.positions ?? []);
      setLoading(false);
    };
    load();
  }, []);

  // Filtering + sorting
  const filtered = useMemo(() => {
    let data = [...positions];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((p) => {
        const name = p.profiles?.name?.toLowerCase() ?? "";
        const email = p.profiles?.email?.toLowerCase() ?? "";
        const planName = p.staking_plans?.name?.toLowerCase() ?? "";
        return (
          name.includes(q) ||
          email.includes(q) ||
          planName.includes(q) ||
          p.user_id.toLowerCase().includes(q)
        );
      });
    }

    // Status filter
    if (statusFilter !== "all") {
      data = data.filter((p) => p.status === statusFilter);
    }

    // Sorting
    data.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;

      if (sortKey === "amount") {
        return (a.amount - b.amount) * dir;
      }

      if (sortKey === "end_date") {
        return (
          (new Date(a.end_date).getTime() - new Date(b.end_date).getTime()) *
          dir
        );
      }

      return (
        (new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()) * dir
      );
    });

    return data;
  }, [positions, search, statusFilter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const statusBadge = (status: string) => {
    const base =
      "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold";

    if (status === "active")
      return (
        <span className={`${base} bg-emerald-500/15 text-emerald-400`}>
          ● Active
        </span>
      );

    if (status === "completed")
      return (
        <span className={`${base} bg-sky-500/15 text-sky-400`}>
          ● Completed
        </span>
      );

    if (status === "cancelled")
      return (
        <span className={`${base} bg-rose-500/15 text-rose-400`}>
          ● Cancelled
        </span>
      );

    return (
      <span className={`${base} bg-zinc-500/15 text-zinc-300`}>
        ● {status}
      </span>
    );
  };

  const openEdit = (p: AdminPlanPosition) => setEditing(p);
  const closeEdit = () => setEditing(null);

  const handleSave = async () => {
    if (!editing) return;

    setSaving(true);

    const res = await fetch("/api/admin/plans", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    const json = await res.json();
    setSaving(false);

    if (json.error) return;

    setPositions((prev) =>
      prev.map((p) => (p.id === json.position.id ? json.position : p))
    );

    setEditing(null);
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">All User Plans</h1>
          <p className="text-xs text-white/50">
            View and manage all staking plan positions.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user, email, plan..."
            className="bg-[#11111a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="bg-[#11111a] border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0d0d14] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-xs uppercase text-white/50">
              <tr>
                <th className="px-3 py-2 text-left">User</th>
                <th className="px-3 py-2 text-left">Plan</th>
                <th
                  className="px-3 py-2 text-left cursor-pointer"
                  onClick={() => toggleSort("amount")}
                >
                  Amount
                </th>
                <th className="px-3 py-2 text-left">Earned</th>
                <th className="px-3 py-2 text-left">Daily / Duration</th>
                <th
                  className="px-3 py-2 text-left cursor-pointer"
                  onClick={() => toggleSort("created_at")}
                >
                  Started
                </th>
                <th
                  className="px-3 py-2 text-left cursor-pointer"
                  onClick={() => toggleSort("end_date")}
                >
                  Ends
                </th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-3 py-6 text-center text-white/40"
                  >
                    Loading plans...
                  </td>
                </tr>
              )}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-3 py-6 text-center text-white/40"
                  >
                    No plans found.
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-white/5 hover:bg-white/5"
                  >
                    {/* User */}
                    <td className="px-3 py-2">
                      <div className="flex flex-col">
                        <span className="text-white text-xs font-medium">
                          {p.profiles?.name ?? "Unknown"}
                        </span>
                        <span className="text-[11px] text-white/40">
                          {p.profiles?.email ?? p.user_id}
                        </span>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-3 py-2">
                      <div className="flex flex-col">
                        <span className="text-white text-xs font-medium">
                          {p.staking_plans?.name ?? "Plan"}
                        </span>
                        <span className="text-[11px] text-white/40">
                          Daily: {p.daily_profit_snapshot}% •{" "}
                          {p.duration_days_snapshot} days
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-3 py-2 text-white text-xs">
                      ${p.amount.toLocaleString()}
                    </td>

                    {/* Earned */}
                    <td className="px-3 py-2 text-white text-xs">
                     ${p.earned_so_far.toLocaleString()}
                    </td>

                    {/* APR / Duration */}
                    <td className="px-3 py-2 text-white text-xs">
                      {p.staking_plans?.apr
                        ? `${p.staking_plans.apr}% APR`
                        : "-"}{" "}
                      • {p.duration_days_snapshot}d
                    </td>

                    {/* Start */}
                    <td className="px-3 py-2 text-white/60 text-[11px]">
                      {new Date(p.created_at).toLocaleString()}
                    </td>

                    {/* End */}
                    <td className="px-3 py-2 text-white/60 text-[11px]">
                      {new Date(p.end_date).toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-2">{statusBadge(p.status)}</td>

                    {/* Actions */}
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0d0d14] border border-white/10 rounded-xl w-full max-w-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">
                Edit Plan Position
              </h2>
              <button
                onClick={closeEdit}
                className="text-white/50 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-3 text-xs">
              {/* User */}
              <div>
                <p className="text-white/60 mb-1">User</p>
                <p className="text-white">
                  {editing.profiles?.name ?? "Unknown"}{" "}
                  <span className="text-white/40">
                    ({editing.profiles?.email ?? editing.user_id})
                  </span>
                </p>
              </div>

              {/* Amount + Earned */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1">
                    Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={editing.amount}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev
                          ? { ...prev, amount: Number(e.target.value) }
                          : prev
                      )
                    }
                    className="w-full bg-[#11111a] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1">
                    Earned so far (USD)
                  </label>
                  <input
                    type="number"
                    value={editing.earned_so_far}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev
                          ? {
                              ...prev,
                              earned_so_far: Number(e.target.value),
                            }
                          : prev
                      )
                    }
                    className="w-full bg-[#11111a] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Status + End Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1">Status</label>
                  <select
                    value={editing.status}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev ? { ...prev, status: e.target.value } : prev
                      )
                    }
                    className="w-full bg-[#11111a] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 mb-1">End date</label>
                  <input
                    type="datetime-local"
                    value={new Date(editing.end_date)
                      .toISOString()
                      .slice(0, 16)}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev
                          ? {
                              ...prev,
                              end_date: new Date(
                                e.target.value
                              ).toISOString(),
                            }
                          : prev
                      )
                    }
                    className="w-full bg-[#11111a] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={closeEdit}
                className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="px-3 py-1.5 rounded-lg text-xs bg-[#FF7900] text-black font-semibold hover:bg-[#ff9933] disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
