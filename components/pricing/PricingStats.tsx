import { StatCard } from "@/components/ui";

interface Props {
  totalStaked: number;
  totalEarned: number;
  avgApy: number;
  balance: number;
  activeCount: number;
}

export function PricingStats({
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
        value={`$${totalStaked.toLocaleString()}`}
        label="Total invested"
      />

      <StatCard
        icon="🎁"
        value={`$${totalEarned.toLocaleString()}`}
        label="Total earnings"
        change={
          activeCount > 0
            ? `${activeCount} active investment${activeCount !== 1 ? "s" : ""}`
            : undefined
        }
        changeDir="up"
      />

      <StatCard
        icon="📈"
        value={avgApy > 0 ? `${avgApy}% daily` : "—"}
        label="Average daily profit"
      />

      <StatCard
        icon="💰"
        value={`$${balance.toLocaleString()}`}
        label="Available balance"
      />
    </div>
  );
}
