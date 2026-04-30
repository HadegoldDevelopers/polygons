"use client";

import StatusBadge from "./StatusBadge";
import type { AdminPlanPosition } from "@/lib/admin/types";

export default function PlansTableRow({
  p,
  openEdit,
}: {
  p: AdminPlanPosition;
  openEdit: (p: AdminPlanPosition) => void;
}) {
  return (
    <tr className="border-t border-white/5 hover:bg-white/5">
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
            Daily: {p.daily_profit_snapshot}% • {p.duration_days_snapshot} days
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
      <td className="px-3 py-2">
        <StatusBadge status={p.status} />
      </td>

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
  );
}
