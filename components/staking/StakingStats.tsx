"use client";

import { StatCard } from "@/components/ui";
import { StakingPosition } from "@/lib/staking/types";

interface Props {
  positions: StakingPosition[];
}

export default function StakingStats({ positions }: Props) {
  const active = positions.filter((p) => p.status === "active");

  const totalsByCoin = active.reduce((acc, p) => {
    acc[p.coin] = (acc[p.coin] ?? 0) + Number(p.amount);
    return acc;
  }, {} as Record<string, number>);

  const totalPending = active.reduce((s, p) => s + Number(p.accrued_reward), 0);
  const totalClaimed = positions.reduce((s, p) => s + Number(p.claimed_reward), 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        icon="🔒"
        name="Total Staked"
        value={
          <div className="flex flex-col gap-1">
            {Object.entries(totalsByCoin).map(([coin, total]) => (
              <div key={coin} className="flex justify-between text-sm">
                <span className="opacity-70">{coin}</span>
                <span className="font-medium">{total}</span>
              </div>
            ))}
          </div>
        }
      />

      <StatCard icon="🎁" name="Pending Rewards" value={totalPending.toFixed(6)} />
      <StatCard icon="✅" name="Total Claimed" value={totalClaimed.toFixed(6)} />
      <StatCard icon="📊" name="Active Positions" value={String(active.length)} />
    </div>
  );
}
