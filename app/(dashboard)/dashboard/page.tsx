"use client";

import { useEffect, useState } from "react";
import { PageHeading } from "@/components/ui";
import { supabase } from "@/lib/supabase/supabaseClient";
import DashboardStats from "@/components/dashboard/DashboardStats";
import BalanceHero    from "@/components/dashboard/BalanceHero";
import QuickActions   from "@/components/dashboard/QuickActions";
import PortfolioList  from "@/components/dashboard/PortfolioList";
import StakingSummary from "@/components/dashboard/StakingSummary";
import RecentActivity from "@/components/dashboard/RecentActivity";

interface Profile     { id: string; name: string; }
interface Wallet      { id: string; symbol: string; amount: number; usd_value: number; change_pct: number; address: string; }
interface Transaction { id: string; type: string; coin: string; amount: number; status: "confirmed" | "pending" | "failed"; direction: "in" | "out"; created_at: string; }
interface StakePos    { id: string; amount: number; earned: number; apy: number; days_left: number; status: string; coin?: string; staking_plans?: { name: string; apr: number }; staking_terms?: { label: string; apy: number }; }
interface Coin        { symbol: string; name: string; icon: string; color: string; }

export default function DashboardPage() {
  const [profile,  setProfile]  = useState<Profile | null>(null);
  const [wallets,  setWallets]  = useState<Wallet[]>([]);
  const [coins,    setCoins]    = useState<Record<string, Coin>>({});
  const [recentTx, setRecentTx] = useState<Transaction[]>([]);
  const [stakes,   setStakes]   = useState<StakePos[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, walletsRes, coinsRes, txRes, stakesRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("wallets_with_value").select("*").eq("user_id", user.id),
        supabase.from("coins").select("*"),
        supabase.from("transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
        supabase.from("staking_positions")
          .select("*, staking_plans(name, apr, duration_days), staking_terms(label, apy)")
          .eq("user_id", user.id).eq("status", "active").order("created_at", { ascending: false }),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (walletsRes.data) setWallets(walletsRes.data);
      if (txRes.data)      setRecentTx(txRes.data);
      if (stakesRes.data)  setStakes(stakesRes.data);
      if (coinsRes.data) {
        const map: Record<string, Coin> = {};
        coinsRes.data.forEach((c: Coin) => { map[c.symbol] = c; });
        setCoins(map);
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  // ── Total USD = SUM of ALL wallets' usd_value ─────────────────
  // e.g. BTC wallet ($2,800) + ETH wallet ($3,400) + PC wallet ($9,600) = $15,800
  const totalUSD         = wallets.reduce((s, w) => s + (w.usd_value ?? 0), 0);
  const polycWallet      = wallets.find((w) => w.symbol === "PC");
  const pendingCount     = recentTx.filter((t) => t.status === "pending").length;
  const totalStaked      = stakes.reduce((s, p) => s + (p.amount  ?? 0), 0);
  const totalEarned      = stakes.reduce((s, p) => s + (p.earned  ?? 0), 0);
  const avgApy           = stakes.length > 0 ? Math.round(stakes.reduce((s, p) => s + (p.apy ?? 0), 0) / stakes.length) : 0;
  const activeStakeCount = stakes.length;
  const hour             = new Date().getHours();
  const greeting         = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName        = profile?.name?.split(" ")[0] ?? "there";

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-64 bg-white/8 rounded-lg" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-white/8 rounded-2xl" />)}
        </div>
        <div className="h-44 bg-white/8 rounded-2xl" />
        <div className="grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-white/8 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">
          <div className="h-64 bg-white/8 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-40 bg-white/8 rounded-2xl" />
            <div className="h-40 bg-white/8 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeading
        title={`${greeting}, ${firstName} 👋`}
        subtitle="Here's what's happening with your portfolio today."
      />

      <DashboardStats
        totalUSD={totalUSD}
        polycAmount={polycWallet?.amount ?? 0}
        polycChangePct={polycWallet?.change_pct ?? 0}
        totalStaked={totalStaked}
        activeStakeCount={activeStakeCount}
        txCount={recentTx.length}
        pendingCount={pendingCount}
      />

      <BalanceHero
        amount={polycWallet?.amount ?? 0}
        usdValue={polycWallet?.usd_value ?? 0}
        changePct={polycWallet?.change_pct ?? 0}
        address={polycWallet?.address ?? ""}
      />

      <QuickActions />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">
        <PortfolioList wallets={wallets} coins={coins} />
        <div className="flex flex-col gap-4">
          <StakingSummary
            stakes={stakes}
            totalStaked={totalStaked}
            totalEarned={totalEarned}
            avgApy={avgApy}
            activeStakeCount={activeStakeCount}
          />
          <RecentActivity transactions={recentTx} />
        </div>
      </div>
    </div>
  );
}
