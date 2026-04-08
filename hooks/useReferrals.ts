"use client";

import { useEffect, useState } from "react";

interface Referral {
  created_at: string;
  referred_id: string;
  profiles: {
    name: string;
  };
}

export function useReferrals() {
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState("");
  const [stats, setStats] = useState({ total: 0, monthly: 0 });
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const load = async () => {
      const linkRes = await fetch("/api/referrals/link").then(r => r.json());
      const statsRes = await fetch("/api/referrals/earnings").then(r => r.json());
      const listRes = await fetch("/api/referrals/list").then(r => r.json());

      setLink(linkRes?.link ?? "");

      setStats({
        total: statsRes?.total ?? 0,
        monthly: statsRes?.monthly ?? 0,
      });

      // THE IMPORTANT FIX
      setReferrals(Array.isArray(listRes) ? listRes : []);

      setLoading(false);
    };

    load();
  }, []);

  return { loading, link, stats, referrals };
}
