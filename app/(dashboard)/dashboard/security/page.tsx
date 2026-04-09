"use client";

import { PageHeading } from "@/components/ui";
import { TwoFactorCard } from "@/components/security/TwoFactorCard";
import { ChangePasswordCard } from "@/components/security/ChangePasswordCard";
import { ActiveSessionsCard } from "@/components/security/ActiveSessionsCard";
import { useSecurity } from "@/hooks/useSecurity";
import { useEffect } from "react";

export default function SecurityPage() {
  const { sessions, loadSessions } = useSecurity();

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);
// gggggg
  return (
    <div>
      <PageHeading title="Security 🔒" subtitle="Protect your account and assets." />

      <div className="max-w-[560px] space-y-5">
        <TwoFactorCard />
        <ChangePasswordCard />
        <ActiveSessionsCard sessions={sessions} reload={loadSessions} />
      </div>
    </div>
  );
}
