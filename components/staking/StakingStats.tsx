import { StatCard } from "@/components/ui";

interface Props {
  totalStaked: number;
  totalEarned: number;
  avgApy: number;
  balance: number;
  activeCount: number;
}

export function StakingStats({
  totalStaked,
  totalEarned,
  avgApy,
  balance,
  activeCount,
}: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        icon="🔒"
        value={totalStaked.toLocaleString()}
        label="Total POLYCOGNI CAPITAL Staked"
      />

      <StatCard
        icon="🎁"
        value={totalEarned.toLocaleString()}
        label="Total POLYCOGNI CAPITAL Earned"
        change={
          activeCount > 0
            ? `${activeCount} active plan${activeCount !== 1 ? "s" : ""}`
            : undefined
        }
        changeDir="up"
      />

      <StatCard
        icon="📈"
        value={avgApy > 0 ? `${avgApy}%` : "—"}
        label="Average APY"
      />

      <StatCard
        icon="💰"
        value={balance.toLocaleString()}
        label="Available POLYCOGNI CAPITAL"
      />
    </div>
  );
}
