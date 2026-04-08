"use client";

import { useEffect, useState } from "react";
import { PageHeading, StatCard } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

// ── Types ──────────────────────────────────────────────────────────
interface StakingPlan {
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

interface StakingPosition {
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

interface HistoryItem {
  id: string;
  amount: number;
  event_type: string;
  created_at: string;
}

// ── Component ──────────────────────────────────────────────────────
export default function StakingPage() {
  const { showToast } = useToast();

  const [loadingPage,   setLoadingPage]   = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const [plans,        setPlans]       = useState<StakingPlan[]>([]);
  const [positions,    setPositions]   = useState<StakingPosition[]>([]); // ← ARRAY
  const [history,      setHistory]     = useState<HistoryItem[]>([]);
  const [balance,      setBalance]     = useState(0);
  const [amount,       setAmount]      = useState("");
  const [selectedPlan, setSelectedPlan] = useState<StakingPlan | null>(null);

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

        const { plans: p }       = await resPlans.json();
        const { positions: pos, balance: bal } = await resPos.json();
        const { history: hist }  = await resHistory.json();

        setPlans(p ?? []);
        setSelectedPlan(p?.[0] ?? null);
        setPositions(pos ?? []);   // ← store all positions
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

  // ── Derived values from ALL positions ───────────────────────────
  const totalStaked  = positions.reduce((s, p) => s + (p.amount ?? 0), 0);
  const totalEarned  = positions.reduce((s, p) => s + (p.earned ?? 0), 0);
  const avgApy       = positions.length > 0
    ? Math.round(positions.reduce((s, p) => s + (p.apy ?? 0), 0) / positions.length)
    : 0;
  const activeCount  = positions.length;

  // ── Reward estimates ─────────────────────────────────────────────
  const daily = amount && selectedPlan
    ? ((Number(amount) * (selectedPlan.apr / 100)) / 365).toFixed(2)
    : "0";
  const monthly = amount && selectedPlan
    ? ((Number(amount) * (selectedPlan.apr / 100)) / 12).toFixed(2)
    : "0";

  // ── Stake ────────────────────────────────────────────────────────
  const handleStake = async () => {
    if (!selectedPlan) return;
    if (!amount || Number(amount) < selectedPlan.min_deposit) {
      showToast(`Minimum stake is ${selectedPlan.min_deposit} POLYC`, "error");
      return;
    }
    if (Number(amount) > balance) {
      showToast("Insufficient POLYC balance", "error");
      return;
    }

    setLoadingAction(true);
    const res = await fetch("/api/staking/stake", {
      method: "POST",
      body: JSON.stringify({ amount: Number(amount), plan_id: selectedPlan.id }),
    });
    const data = await res.json();
    setLoadingAction(false);

    if (!res.ok) { showToast(data.error, "error"); return; }

    showToast("Staking successful! 🔒", "success");
    setAmount("");
    await loadPositions();
  };

  // ── Claim rewards for a specific position ────────────────────────
  const handleClaim = async (positionId: string) => {
    setLoadingAction(true);
    const res = await fetch("/api/staking/claim", {
      method: "POST",
      body: JSON.stringify({ position_id: positionId }),
    });
    const data = await res.json();
    setLoadingAction(false);

    if (!res.ok) { showToast(data.error, "error"); return; }

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
      <PageHeading title="Staking" subtitle="Stake POLYC to earn passive rewards." />

      {/* ── Stats — aggregated across ALL positions ─────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon="🔒"
          value={totalStaked.toLocaleString()}
          label="Total POLYC Staked"
        />
        <StatCard
          icon="🎁"
          value={totalEarned.toLocaleString()}
          label="Total POLYC Earned"
          change={activeCount > 0 ? `${activeCount} active plan${activeCount !== 1 ? "s" : ""}` : undefined}
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
          label="Available POLYC"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Stake form ──────────────────────────────────────────── */}
        <div className="card space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
            Stake POLYC
          </p>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
              Amount to Stake
            </label>
            <div className="relative">
              <input
                type="number"
                className="field pr-16"
                placeholder={`Min. ${selectedPlan?.min_deposit ?? 0} POLYC`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={() => setAmount(String(balance))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#FF7900] hover:underline"
              >
                MAX
              </button>
            </div>
            <p className="text-xs text-white/40 mt-1.5">
              Available: {balance.toLocaleString()} POLYC
            </p>
          </div>

          {/* Plan selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
              Choose Plan
            </label>
            <div className="flex flex-col gap-2">
              {plans.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlan(p)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                    selectedPlan?.id === p.id
                      ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                      : "bg-[#1a1a24] border-white/8 hover:border-white/20"
                  }`}
                >
                  <span>{p.name ?? `${p.duration_days} days`}</span>
                  <span className={selectedPlan?.id === p.id ? "text-[#FF7900]" : "text-[#00d4aa]"}>
                    {p.apr}% APY
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Estimates */}
          <div className="bg-[#1a1a24] rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/45">Est. daily reward</span>
              <span className="font-bold text-[#00d4aa]">~{daily} POLYC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/45">Est. monthly reward</span>
              <span className="font-bold text-[#00d4aa]">~{monthly} POLYC</span>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleStake}
            disabled={loadingAction}
          >
            {loadingAction ? (
              <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              "Stake POLYC 🔒"
            )}
          </button>
        </div>

        {/* ── Active stakes — ALL positions ───────────────────────── */}
        <div className="card space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
              Active Stakes
            </p>
            {activeCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF7900]/15 text-[#FF7900]">
                {activeCount} active
              </span>
            )}
          </div>

          {positions.length === 0 ? (
            <p className="text-white/40 text-sm py-4 text-center">
              No active stakes yet.
            </p>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {positions.map((pos, i) => (
                <div key={pos.id} className="bg-[#1a1a24] rounded-xl p-4 space-y-3">

                  {/* Plan name + index */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black">
                      {pos.staking_plans?.name ?? `Stake #${i + 1}`}
                    </p>
                    <span className="text-xs font-bold text-[#FF7900]">
                      {pos.apy ?? pos.staking_plans?.apr}% APY
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/45">Staked amount</span>
                      <span className="font-bold">{(pos.amount ?? 0).toLocaleString()} POLYC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/45">Unlocks in</span>
                      <span className="font-bold text-[#FF7900]">{pos.days_left} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/45">Accumulated rewards</span>
                      <span className="font-bold text-[#00d4aa]">
                        +{(pos.earned ?? 0).toLocaleString()} POLYC
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="h-1.5 bg-white/8 rounded-full">
                      <div
                        className="h-full rounded-full bg-[#FF7900] transition-all"
                        style={{ width: `${pos.progress ?? 0}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-white/40 mt-1">
                      {pos.progress ?? 0}% of lock period elapsed ·{" "}
                      Started {new Date(pos.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Claim button per position */}
                  <button
                    className="btn-ghost w-full text-sm py-2"
                    onClick={() => handleClaim(pos.id)}
                    disabled={loadingAction}
                  >
                    🎁 Claim Rewards
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── Staking history ────────────────────────────────────── */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
              Staking History
            </p>
            <div className="space-y-2">
              {history.length === 0 && (
                <p className="text-white/40 text-sm">No history yet.</p>
              )}
              {history.map((h) => (
                <div
                  key={h.id}
                  className="flex justify-between items-center py-2.5 border-b border-white/8 last:border-0 text-sm"
                >
                  <div>
                    <p className="font-bold">{(h.amount ?? 0).toLocaleString()} POLYC</p>
                    <p className="text-xs text-white/40">
                      {new Date(h.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    h.event_type === "stake_created"
                      ? "bg-[#FF7900]/15 text-[#FF7900]"
                      : "bg-[#00d4aa]/10 text-[#00d4aa]"
                  }`}>
                    {h.event_type.replace(/_/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}