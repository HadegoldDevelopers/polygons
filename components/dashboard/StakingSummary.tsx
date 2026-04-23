// components/dashboard/StakingSummary.tsx
"use client";
import Link from "next/link";

interface StakingPosition {
  id:           string;
  amount:       number;
  earned:       number;
  apy:          number;
  days_left:    number;
  staking_plans?: { name: string; apr: number };
  staking_terms?: { label: string; apy: number };
  coin?:        string;
}

interface Props {
  stakes:           StakingPosition[];
  totalStaked:      number;
  totalEarned:      number;
  avgApy:           number;
  activeStakeCount: number;
}

export default function StakingSummary({
  stakes,
  totalStaked,
  totalEarned,
  avgApy,
  activeStakeCount,
}: Props) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
          Staking Summary
        </p>
        {activeStakeCount > 0 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF7900]/15 text-[#FF7900]">
            {activeStakeCount} active
          </span>
        )}
      </div>

      {stakes.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-sm text-white/30 mb-3">No active staking plans</p>
          <Link href="/dashboard/staking">
            <button className="btn-ghost text-xs px-3 py-1.5 rounded-lg">
              Start Staking →
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Aggregate totals */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Staked", value: `$${totalStaked.toLocaleString()}`, color: ""                 },
              { label: "Earned", value: `+$${totalEarned.toLocaleString()}`,color: "text-[#00d4aa]"   },
              { label: "Avg APY",value: `${avgApy}%`,                       color: "text-[#FF7900]"   },
            ].map((s) => (
              <div key={s.label} className="bg-[#1a1a24] rounded-xl p-2.5 text-center">
                <p className="text-[10px] text-white/40 font-bold uppercase mb-1">{s.label}</p>
                <p className={`text-sm font-black ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Preview first 2 stakes */}
          <div className="space-y-2 mb-4">
            {stakes.slice(0, 2).map((stake) => (
              <div
                key={stake.id}
                className="flex items-center justify-between bg-[#1a1a24] rounded-xl px-3 py-2.5"
              >
                <div>
                  <p className="text-xs font-bold">
                    {stake.staking_plans?.name ?? stake.staking_terms?.label ?? "Staking Plan"}
                  </p>
                  <p className="text-[10px] text-white/40">
                    {stake.days_left ?? "—"}d left ·{" "}
                    {stake.staking_plans?.apr ?? stake.staking_terms?.apy ?? stake.apy}% APY
                    {stake.coin ? ` · ${stake.coin}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">${(stake.amount ?? 0).toLocaleString()}</p>
                  <p className="text-[10px] text-[#00d4aa] font-bold">
                    +${(stake.earned ?? 0).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            {stakes.length > 2 && (
              <p className="text-[11px] text-white/30 text-center py-1">
                +{stakes.length - 2} more active plan{stakes.length - 2 !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          <Link href="/dashboard/staking">
            <button className="btn-ghost w-full text-xs py-2.5 rounded-lg">
              Manage All Stakes →
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
