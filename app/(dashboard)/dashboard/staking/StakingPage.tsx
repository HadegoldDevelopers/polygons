"use client";

import { useEffect, useState } from "react";
import { PageHeading, StatCard } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

// Components (your extracted UI blocks)
import { StakeForm } from "@/components/staking/StakeForm";
import { ActiveStakes } from "@/components/staking/ActiveStakes";
import { StakingHistory } from "@/components/staking/StakingHistory";

// ── Types ──────────────────────────────────────────────────────────
export interface StakingPlan {
  id: string;
  name: string;
  min_deposit: number;
  max_deposit?: number;
  apr: number;
  duration_days: number;
  daily_profit?: number;
  referral_bonus?: number;
  notes?: string[];
}

export interface StakingPosition {
  id: string;
  user_id: string;
  amount: number;
  earned: number;
  apy: number;
  lock_days: number;
  days_left: number;
  progress: number;
  status: string;
  plan_id?: string;
  created_at: string;
  staking_plans?: StakingPlan;
}

export interface HistoryItem {
  id: string;
  amount: number;
  event_type: string;
  created_at: string;
}

// ── Component ──────────────────────────────────────────────────────
export default function StakingPage() {
  const { showToast } = useToast();

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const [plans, setPlans] = useState<StakingPlan[]>([]);
  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<StakingPlan | null>(null);
  const [historyLimit, setHistoryLimit] = useState(5);


  // ── Load data ────────────────────────────────────────────────────
  const loadPositions = async () => {
    const res = await fetch("/api/staking/position");
    const { positions: pos, balance: bal } = await res.json();
    setPositions(pos ?? []);
    setBalance(bal ?? 0);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [resPlans, resPos, resHistory] = await Promise.all([
          fetch("/api/staking/plans"),
          fetch("/api/staking/position"),
          fetch("/api/staking/history"),
        ]);

        const { plans: p } = await resPlans.json();
        const { positions: pos, balance: bal } = await resPos.json();
        const { history: hist } = await resHistory.json();

        setPlans(p ?? []);
        setSelectedPlan(p?.[0] ?? null);
        setPositions(pos ?? []);
        setBalance(bal ?? 0);
        setHistory(hist ?? []);
      } catch (err) {
        console.error(err);
        showToast("Failed to load staking data", "error");
      } finally {
        setLoadingPage(false);
      }
    };
    load();
  }, []);

  // ── Derived values ───────────────────────────────────────────────
  const totalStaked = positions.reduce((s, p) => s + (p.amount ?? 0), 0);
  const totalEarned = positions.reduce((s, p) => s + (p.earned ?? 0), 0);
  const avgApy =
    positions.length > 0
      ? Math.round(
          positions.reduce((s, p) => s + (p.apy ?? 0), 0) / positions.length
        )
      : 0;
  const activeCount = positions.length;

  // ── Reward estimates ─────────────────────────────────────────────
  const daily =
    amount && selectedPlan
      ? ((Number(amount) * (selectedPlan.apr / 100)) / 365).toFixed(2)
      : "0";

  const monthly =
    amount && selectedPlan
      ? ((Number(amount) * (selectedPlan.apr / 100)) / 12).toFixed(2)
      : "0";

  // ── Stake ────────────────────────────────────────────────────────
  const handleStake = async () => {
    if (!selectedPlan) return;
    if (!amount || Number(amount) < selectedPlan.min_deposit) {
      showToast(
        `Minimum stake is ${selectedPlan.min_deposit} POLYCOGNI CAPITAL`,
        "error"
      );
      return;
    }
    if (Number(amount) > balance) {
      showToast("Insufficient POLYCOGNI CAPITAL balance", "error");
      return;
    }

    setLoadingAction(true);
    const res = await fetch("/api/staking/stake", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
        plan_id: selectedPlan.id,
      }),
    });
    const data = await res.json();
    setLoadingAction(false);

    if (!res.ok) {
      showToast(data.error, "error");
      return;
    }

    showToast("Staking successful! 🔒", "success");
    setAmount("");
    await loadPositions();
  };

  // ── Claim ─────────────────────────────────────────────────────────
  const handleClaim = async (positionId: string) => {
    setLoadingAction(true);
    const res = await fetch("/api/staking/claim", {
      method: "POST",
      body: JSON.stringify({ position_id: positionId }),
    });
    const data = await res.json();
    setLoadingAction(false);

    if (!res.ok) {
      showToast(data.error, "error");
      return;
    }

    showToast("Rewards claimed! 🎁", "success");
    await loadPositions();
  };

  // ── Loading ───────────────────────────────────────────────────────
  if (loadingPage) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
          <p className="text-sm text-white/40">Loading staking…</p>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div>
      <PageHeading
        title="Staking"
        subtitle="Stake POLYCOGNI CAPITAL to earn passive rewards."
      />

      {/* Stats */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stake Form */}
        <StakeForm
          amount={amount}
          setAmount={setAmount}
          balance={balance}
          plans={plans}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          daily={daily}
          monthly={monthly}
          loadingAction={loadingAction}
          handleStake={handleStake}
        />

        {/* Active Stakes */}
        <ActiveStakes
  positions={positions}
  history={history}
  historyLimit={historyLimit}
  setHistoryLimit={setHistoryLimit}
  activeCount={activeCount}
  loadingAction={loadingAction}
  handleClaim={handleClaim}
/>


      </div>
      
    </div>
  );
}
