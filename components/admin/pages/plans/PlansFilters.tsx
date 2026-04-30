"use client";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
   setStatusFilter: (v: string) => void;
};

export default function PlansFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: Props) {
  return (
    <div className="flex gap-2">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search user, email, plan..."
        className="bg-[#11111a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-64"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="bg-[#11111a] border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white"
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
}
