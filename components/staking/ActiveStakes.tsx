"use client";

import { StakingPosition, HistoryItem } from "@/hooks/useStaking";

interface Props {
  positions: StakingPosition[];
  history: HistoryItem[];
  historyLimit: number;
  setHistoryLimit: (n: number) => void;
  activeCount: number;
  loadingAction: boolean;
  handleClaim: (id: string) => void;
}

export function ActiveStakes({
  positions,
  history,
  historyLimit,
  setHistoryLimit,
  activeCount,
  loadingAction,
  handleClaim,
}: Props) {
  return (
    <div className="card space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
          Active Stakes
        </p>
        {activeCount > 0 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF7900]/15 text-[#FF7900]">
            {activeCount} active
          </span>
        )}
      </div>

      {/* Active stakes list */}
      {positions.length === 0 ? (
        <p className="text-white/40 text-sm py-4 text-center">
          No active stakes yet.
        </p>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {positions.map((pos, i) => (
            <div key={pos.id} className="bg-[#1a1a24] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black">
                  {pos.staking_plans?.name ?? `Stake #${i + 1}`}
                </p>
                <span className="text-xs font-bold text-[#FF7900]">
                  {pos.apy ?? pos.staking_plans?.apr}% APY
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/45">Staked amount</span>
                  <span className="font-bold">
                    {(pos.amount ?? 0).toLocaleString()} POLYCOGNI CAPITAL
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/45">Unlocks in</span>
                  <span className="font-bold text-[#FF7900]">
                    {pos.days_left} days
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/45">Accumulated rewards</span>
                  <span className="font-bold text-[#00d4aa]">
                    +{(pos.earned ?? 0).toLocaleString()} POLYCOGNI CAPITAL
                  </span>
                </div>
              </div>

              <div>
                <div className="h-1.5 bg-white/8 rounded-full">
                  <div
                    className="h-full rounded-full bg-[#FF7900] transition-all"
                    style={{ width: `${pos.progress ?? 0}%` }}
                  />
                </div>
                <p className="text-[10px] text-white/40 mt-1">
                  {pos.progress ?? 0}% of lock period elapsed · Started{" "}
                  {new Date(pos.created_at).toLocaleDateString()}
                </p>
              </div>

              <button
                className="btn-ghost w-full text-sm py-2"
                onClick={() => handleClaim(pos.id)}
                disabled={loadingAction}
              >
                🎁 Claim Rewards
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Staking History */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
          Staking History
        </p>

        <div className="space-y-2">
          {history.length === 0 && (
            <p className="text-white/40 text-sm">No history yet.</p>
          )}

          {history.slice(0, historyLimit).map((h) => (
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

          {/* Load More */}
          {historyLimit < history.length && (
            <button
              onClick={() => setHistoryLimit(historyLimit + 5)}
              className="w-full text-xs font-bold text-[#FF7900] py-2 hover:underline"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
