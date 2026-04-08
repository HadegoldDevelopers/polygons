"use client";

import { StatCard } from "@/components/ui";

interface Referral {
  created_at: string;
  referred_id: string;
  profiles: {
    name: string;
  };
}

interface ReferralStatsProps {
  stats: {
    total: number;
    monthly: number;
  };
  referrals: Referral[];
}

export function ReferralStats({ stats, referrals }: ReferralStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <StatCard icon="👥" value={referrals.length} label="Total Referrals" />

      <StatCard
        icon="💰"
        value={`${stats.total} PLOYCONGI CAPITAL`}
        label="Earned from Referrals"
        change="This month"
        changeDir="up"
      />

      <StatCard icon="🔗" value="10%" label="Commission Rate" />
    </div>
  );
}
