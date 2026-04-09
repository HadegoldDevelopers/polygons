"use client";

import { HistoryItem } from "@/hooks/useStaking";

interface Props {
  history: HistoryItem[];
}

export function StakingHistory({ history }: Props) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
        Staking History
      </p>

      <div className="space-y-2">
        {history.length === 0 && (
          <p className="text-white/40 text-sm">No history yet.</p>
        )}

        {history.map((h) => (
          <div
            key={h.id}
            className="flex justify-between items-center py-2.5 border-b border-white/8 last:border-0 text-sm"
          >
            <div>
              <p className="font-bold">
                {(h.amount ?? 0).toLocaleString()} POLYCOGNI CAPITAL
              </p>
              <p className="text-xs text-white/40">
                {new Date(h.created_at).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                h.event_type === "stake_created"
                  ? "bg-[#FF7900]/15 text-[#FF7900]"
                  : "bg-[#00d4aa]/10 text-[#00d4aa]"
              }`}
            >
              {h.event_type.replace(/_/g, " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
