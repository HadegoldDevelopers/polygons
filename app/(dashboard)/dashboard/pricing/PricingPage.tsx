"use client";

import { useEffect, useState } from "react";
import { PageHeading, StatCard } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

import { PricingForm } from "@/components/pricing/PricingForm";
import { ActivePlans } from "@/components/pricing/ActivePlans";

import type { PricingPlan, PricingPosition, HistoryItem } from "@/hooks/usePricing";

export default function PricingPage() {
  const { showToast } = useToast();

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [positions, setPositions] = useState<PricingPosition[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [historyLimit, setHistoryLimit] = useState(5);

  // ───────────────────────────────────────────────
  // Helper: compute derived fields for a position
  // ───────────────────────────────────────────────
  const computePosition = (p: PricingPosition) => {
    const daily = p.daily_profit_snapshot;
    const duration = p.duration_days_snapshot;

    const created = new Date(p.created_at);
    const end = new Date(p.end_date);
    const now = new Date();

    const msElapsed = now.getTime() - created.getTime();
    const daysElapsed = Math.floor(msElapsed / (1000 * 60 * 60 * 24));

    const msLeft = end.getTime() - now.getTime();
    const daysLeft = Math.max(Math.ceil(msLeft / (1000 * 60 * 60 * 24)), 0);

    const progress =
      duration > 0 ? Math.min((daysElapsed / duration) * 100, 100) : 0;

    const earned = p.amount * (daily / 100) * daysElapsed;

    return {
      ...p,
      earned,
      days_left: daysLeft,
      progress,
    };
  };

  // ───────────────────────────────────────────────
  // Load positions
  // ───────────────────────────────────────────────
  const loadPositions = async () => {
    const res = await fetch("/api/user/pricing/position");
    const { positions: pos, balance: bal } = await res.json();

    const computed = (pos ?? []).map((p: PricingPosition) =>
      computePosition(p)
    );

    setPositions(computed);
    setBalance(bal ?? 0);
  };

  // ───────────────────────────────────────────────
  // Initial load
  // ───────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const [resPlans, resPos] = await Promise.all([
          fetch("/api/user/pricing/plans"),
          fetch("/api/user/pricing/activity"),
        ]);

        const { plans: p } = await resPlans.json();
        const { positions: pos, balance: bal } = await resPos.json();

console.log("PLANS:", p);
console.log("POSITIONS:", pos);
console.log("BALANCE:", bal);


        setPlans(p ?? []);
        setSelectedPlan(p?.[0] ?? null);

        const computed = (pos ?? []).map((p: PricingPosition) =>
          computePosition(p)
        );

        setPositions(computed);
        setBalance(bal ?? 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPage(false);
      }
    };

    load();
  }, []);

  // ───────────────────────────────────────────────
  // Derived values
  // ───────────────────────────────────────────────
  const totalInvested = positions.reduce((s, p) => s + p.amount, 0);
  const totalEarned = positions.reduce((s, p) => s + p.earned, 0);

  const avgDaily =
    positions.length > 0
      ? Math.round(
          positions.reduce((s, p) => s + p.daily_profit_snapshot, 0) /
            positions.length
        )
      : 0;

  const activeCount = positions.length;

  // ───────────────────────────────────────────────
  // Earnings preview
  // ───────────────────────────────────────────────
  const daily =
    amount && selectedPlan
      ? (Number(amount) * (selectedPlan.daily_profit / 100)).toFixed(2)
      : "0";

  const monthly =
    amount && selectedPlan ? (Number(daily) * 30).toFixed(2) : "0";

  // ───────────────────────────────────────────────
  // Start investment
  // ───────────────────────────────────────────────
  const handleStake = async () => {
    if (!selectedPlan) return;

    if (!amount || Number(amount) < selectedPlan.min_deposit) {
      showToast(
        `Minimum investment is ${selectedPlan.min_deposit} USD`,
        "error"
      );
      return;
    }

    if (selectedPlan.max_deposit && Number(amount) > selectedPlan.max_deposit) {
      showToast(
        `Maximum investment for this plan is ${selectedPlan.max_deposit} USD`,
        "error"
      );
      return;
    }

    if (Number(amount) > balance) {
      showToast("Insufficient USD balance", "error");
      return;
    }

    setLoadingAction(true);
    const res = await fetch("/api/user/pricing/plans", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
        plan_id: selectedPlan.id,
      }),
    });
    const data = await res.json();
    setLoadingAction(false);

    if (!res.ok) {
      showToast(data.error ?? "Failed to start investment", "error");
      return;
    }

    showToast("Investment started successfully! 📈", "success");
    setAmount("");
    await loadPositions();
  };

  // ───────────────────────────────────────────────
  // Render
  // ───────────────────────────────────────────────
  if (loadingPage) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
          <p className="text-sm text-white/40">Loading investments…</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeading
        title="Investment Plans"
        subtitle="Choose a plan, invest in USD, and earn a fixed daily return."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon="🔒"
          value={`$${totalInvested.toLocaleString()}`}
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
          value={avgDaily > 0 ? `${avgDaily}% daily` : "—"}
          label="Average daily profit"
        />
        <StatCard
          icon="💰"
          value={`$${balance.toLocaleString()}`}
          label="Available balance"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PricingForm
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

        <ActivePlans
          positions={positions}
          history={history}
          historyLimit={historyLimit}
          setHistoryLimit={setHistoryLimit}
          activeCount={activeCount}
          loadingAction={loadingAction}
        />
      </div>
    </div>
  );
}
