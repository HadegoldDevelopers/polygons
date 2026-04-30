"use client";

import PlansTableRow from "./PlansTableRow";
import type { AdminPlanPosition, SortKey } from "@/lib/admin/types";

type Props = {
  loading: boolean;
  filtered: AdminPlanPosition[];
  toggleSort: (key: SortKey) => void;
  openEdit: (p: AdminPlanPosition) => void;
};


export default function PlansTable({
  loading,
  filtered,
  toggleSort,
  openEdit,
}: Props) {
  return (
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
                <PlansTableRow key={p.id} p={p} openEdit={openEdit} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
