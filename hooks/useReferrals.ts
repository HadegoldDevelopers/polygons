"use client";

import { useEffect, useState } from "react";

interface Referral {
  created_at: string;
  referred_id: string;
  profiles: {
    name: string;
  };
  earnings: { amount: number }[];
}

export function useReferrals() {
  const [loadingPage, setLoading] = useState(true);
  const [link, setLink] = useState("");
  const [stats, setStats] = useState({ total: 0, monthly: 0 });
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const load = async () => {
      const linkRes = await fetch("/api/user/referrals/link").then(r => r.json());
      const statsRes = await fetch("/api/user/referrals/earnings").then(r => r.json());
      const listRes = await fetch("/api/user/referrals/list").then(r => r.json());

      setLink(linkRes?.link ?? "");

      setStats({
        total: statsRes?.total ?? 0,
        monthly: statsRes?.monthly ?? 0,
      });

      // NORMALIZE THE API RESPONSE HERE
     const normalized: Referral[] = Array.isArray(listRes)
  ? listRes.map((r) => ({
      created_at: r.created_at,
      referred_id: r.referred_id,
      profiles: {
        name: r.profiles?.name ?? "Unknown",
      },
      earnings:
        r.profiles?.earnings?.map(
          (e: { amount: number | string }) => ({
            amount: Number(e.amount),
          })
        ) ?? [],
    }))
  : [];


      setReferrals(normalized);

      setLoading(false);
    };

    load();
  }, []);

  return { loadingPage, link, stats, referrals };
}
