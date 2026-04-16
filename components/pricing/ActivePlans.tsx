"use client";

import { PricingPosition, HistoryItem } from "@/hooks/usePricing";

interface Props {
  positions: PricingPosition[];
  history: HistoryItem[];
  historyLimit: number;
  setHistoryLimit: (n: number) => void;
  activeCount: number;
  loadingAction: boolean;
}

export function ActivePlans({
  positions,
  history,
  historyLimit,
  setHistoryLimit,
  activeCount,
  loadingAction,
}: Props) {
  return (
    <div className="card space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
          Active Investments
        </p>
        {activeCount > 0 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF7900]/15 text-[#FF7900]">
            {activeCount} active
          </span>
        )}
      </div>

      {/* Active Investments */}
      {positions.length === 0 ? (
        <p className="text-white/40 text-sm py-4 text-center">
          No active investments yet.
        </p>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {positions.map((pos, i) => {
            const plan = pos.staking_plans;

            // Snapshot values
            const dailyPercent = pos.daily_profit_snapshot ?? 0;
            const duration = pos.duration_days_snapshot ?? 0;

            // Compute days left
            const end = new Date(pos.end_date);
            const now = new Date();
            const msLeft = end.getTime() - now.getTime();
            const daysLeft = Math.max(
              Math.ceil(msLeft / (1000 * 60 * 60 * 24)),
              0
            );

            // Compute progress
            const created = new Date(pos.created_at);
            const msElapsed = now.getTime() - created.getTime();
            const daysElapsed = Math.floor(
              msElapsed / (1000 * 60 * 60 * 24)
            );
            const progress =
              duration > 0
                ? Math.min((daysElapsed / duration) * 100, 100)
                : 0;

            // Compute earned
            const earned =
              pos.amount * (dailyPercent / 100) * daysElapsed;

            return (
              <div
                key={pos.id}
                className="bg-[#1a1a24] rounded-xl p-4 space-y-3"
              >
                {/* Plan name + daily % */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black">
                    {plan?.name ?? `Investment #${i + 1}`}
                  </p>
                  <span className="text-xs font-bold text-[#FF7900]">
                    {dailyPercent}% daily
                  </span>
                </div>

                {/* Amount invested */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/45">Invested amount</span>
                    <span className="font-bold">
                      ${pos.amount.toLocaleString()}
                    </span>
                  </div>

                  {/* Total earned */}
                  <div className="flex justify-between text-sm">
                    <span className="text-white/45">Total earned</span>
                    <span className="font-bold text-[#00d4aa]">
                      +${earned.toLocaleString()}
                    </span>
                  </div>

                  {/* Days remaining */}
                  <div className="flex justify-between text-sm">
                    <span className="text-white/45">Days remaining</span>
                    <span className="font-bold text-[#FF7900]">
                      {daysLeft} days
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="h-1.5 bg-white/8 rounded-full">
                    <div
                      className="h-full rounded-full bg-[#FF7900] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-white/40 mt-1">
                    {progress.toFixed(0)}% completed · Started{" "}
                    {new Date(pos.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Investment History */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
          Investment History
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
                <p className="font-bold">${h.amount.toLocaleString()}</p>
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
