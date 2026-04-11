"use client";

import { useReferrals } from "@/hooks/useReferrals";
import { PageHeading } from "@/components/ui";
import { ReferralStats } from "@/components/referrals/ReferralStats";
import { ReferralLinkCard } from "@/components/referrals/ReferralLinkCard";
import { ReferralHowItWorks } from "@/components/referrals/ReferralHowItWorks";
import { ReferralList } from "@/components/referrals/ReferralList";

export default function ReferralPage() {
  const { loadingPage, link, stats, referrals } = useReferrals();

   if (loadingPage) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
          <p className="text-sm text-white/40">Loading referrals…</p>
        </div>
      </div>
    );
  }

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
