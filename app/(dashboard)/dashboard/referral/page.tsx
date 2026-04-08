"use client";

import { useReferrals } from "@/hooks/useReferrals";
import { PageHeading } from "@/components/ui";
import { ReferralStats } from "@/components/referrals/ReferralStats";
import { ReferralLinkCard } from "@/components/referrals/ReferralLinkCard";
import { ReferralHowItWorks } from "@/components/referrals/ReferralHowItWorks";
import { ReferralList } from "@/components/referrals/ReferralList";

export default function ReferralPage() {
  const { loading, link, stats, referrals } = useReferrals();

  if (loading) return <p className="text-white/40">Loading...</p>;

  return (
    <div>
      <PageHeading
        title="Referral Program 🎁"
        subtitle="Invite friends and earn 10% of their transaction fees."
      />

      <ReferralStats stats={stats} referrals={referrals} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card space-y-5">
          <ReferralLinkCard link={link} />
          <ReferralHowItWorks />
        </div>

        <ReferralList referrals={referrals} />
      </div>
    </div>
  );
}
