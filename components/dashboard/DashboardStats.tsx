// components/dashboard/DashboardStats.tsx
"use client";
import { StatCard } from "@/components/ui";

interface Props {
  totalUSD:         number;
  polycAmount:      number;
  polycChangePct:   number;
  totalStaked:      number;
  activeStakeCount: number;
  txCount:          number;
  pendingCount:     number;
}

export default function DashboardStats({
  totalUSD,
  polycAmount,
  polycChangePct,
  totalStaked,
  activeStakeCount,
  txCount,
  pendingCount,
}: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        icon="💰"
        value={`$${totalUSD.toLocaleString("en", { maximumFractionDigits: 2 })}`}
        label="Total Balance (USD)"
        change="All wallets combined"
        changeDir="up"
      />
      <StatCard
        icon="🪙"
        value={polycAmount.toLocaleString()}
        label="PC Holdings"
        change={`${polycChangePct}% today`}
        changeDir={polycChangePct >= 0 ? "up" : "down"}
      />
      <StatCard
        icon="🔒"
        value={`$${totalStaked.toLocaleString()}`}
        label="Total Staked"
        change={`${activeStakeCount} active plan${activeStakeCount !== 1 ? "s" : ""}`}
        changeDir="up"
      />
      <StatCard
        icon="🔄"
        value={String(txCount)}
        label="Recent Transactions"
        change={pendingCount > 0 ? `${pendingCount} pending` : "All confirmed"}
        changeDir={pendingCount > 0 ? "down" : "up"}
      />
    </div>
  );
}
