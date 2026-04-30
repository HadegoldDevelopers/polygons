"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminPlanPosition } from "@/lib/admin/types";

import PlansHeader from "@/components/admin/pages/plans/PlansHeader";
import PlansFilters from "@/components/admin/pages/plans/PlansFilters";
import PlansTable from "@/components/admin/pages/plans/PlansTable";
import EditPlanModal from "@/components/admin/pages/plans/EditPlanModal";

type StatusFilter = "all" | "active" | "completed" | "cancelled";
type SortKey = "created_at" | "amount" | "end_date";

export default function AdminPlansClient() {
  const [positions, setPositions] = useState<AdminPlanPosition[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [editing, setEditing] = useState<AdminPlanPosition | null>(null);
  const [saving, setSaving] = useState(false);

  // Load plans
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

      if (sortKey === "amount") return (a.amount - b.amount) * dir;

      if (sortKey === "end_date") {
        return (
          (new Date(a.end_date).getTime() -
            new Date(b.end_date).getTime()) * dir
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
      <PlansHeader />

      <PlansFilters
  search={search}
  setSearch={setSearch}
  statusFilter={statusFilter}
  setStatusFilter={(v) => setStatusFilter(v as StatusFilter)}
/>

      <PlansTable
        loading={loading}
        filtered={filtered}
        toggleSort={toggleSort}
        openEdit={openEdit}
      />

      {editing && (
        <EditPlanModal
          editing={editing}
          closeEdit={closeEdit}
          handleSave={handleSave}
          saving={saving}
          setEditing={setEditing}
        />
      )}
    </div>
  );
}
