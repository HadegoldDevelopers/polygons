"use client";

import { useEffect, useState } from "react";
import { PageHeading } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

// Components
import StakingStats from "@/components/staking/StakingStats";
import StakeForm from "@/components/staking/StakeForm";
import ActiveStakes from "@/components/staking/ActiveStakes";
import CompletedStakes from "@/components/staking/CompletedStakes";
import UnstakeModal from "@/components/staking/UnstakeModal";

// Types
import {
  StakingTerm,
  StakingPosition,
  Wallet,
} from "@/lib/staking/types";

const coinIcons: Record<string, string> = {
  POLYC: "🪙", BTC: "₿", ETH: "Ξ", USDT: "$",
  BNB: "🔶", ADA: "🔵", SOL: "◎", XRP: "✕",
  DOT: "⚫", DOGE: "🐕",
};

export default function StakingPage() {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);

  const [terms, setTerms] = useState<StakingTerm[]>([]);
  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [selectedTerm, setSelectedTerm] = useState<StakingTerm | null>(null);
  const [amount, setAmount] = useState<string>("");

  const [unstakeConfirm, setUnstakeConfirm] = useState<StakingPosition | null>(null);

  // ─────────────────────────────────────────────
  // Load everything from ONE endpoint
  // ─────────────────────────────────────────────
  const loadData = async () => {
    try {
      const res = await fetch("/api/user/staking/position");
      const json = await res.json();

      setPositions(json.positions ?? []);
      setWallets(json.wallets ?? []);
      setTerms(json.terms ?? []);

      if (json.terms?.length && !selectedTerm) {
        setSelectedTerm(json.terms[0]);
      }
    } catch {
      showToast("Failed to load staking data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // ─────────────────────────────────────────────
  // Derived values
  // ─────────────────────────────────────────────
  const active = positions.filter((p) => p.status === "active");
  const completed = positions.filter((p) => p.status === "completed");

  const selectedWallet = wallets.find((w) => w.symbol === selectedCoin);
  const availableBal = selectedWallet?.amount ?? 0;

  const dailyEst =
    amount && selectedTerm
      ? (Number(amount) * selectedTerm.apr / 100 / 365).toFixed(8)
      : "0";

  const totalEst =
    amount && selectedTerm
      ? (
          Number(amount) *
          selectedTerm.apr /
          100 /
          365 *
          selectedTerm.months
        ).toFixed(8)
      : "0";

  // ─────────────────────────────────────────────
  // Stake
  // ─────────────────────────────────────────────
  const handleStake = async () => {
    if (!selectedCoin) return showToast("Select a coin", "error");
    if (!selectedTerm) return showToast("Select a term", "error");
    if (!amount || Number(amount) <= 0) return showToast("Enter valid amount", "error");
    if (Number(amount) > availableBal) return showToast(`Insufficient ${selectedCoin}`, "error");

    setActing("stake");

    const res = await fetch("/api/user/staking/stake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coin: selectedCoin,
        amount: Number(amount),
        term_id: selectedTerm.id,
      }),
    });

    const data = await res.json();
    setActing(null);

    if (!res.ok) return showToast(data.error, "error");

    showToast(`🔒 Staked ${amount} ${selectedCoin}!`, "success");
    setAmount("");
    await loadData();
  };

  // ─────────────────────────────────────────────
  // Claim
  // ─────────────────────────────────────────────
  const handleClaim = async (positionId: string) => {
    setActing(positionId);

    const res = await fetch("/api/user/staking/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position_id: positionId }),
    });

    const data = await res.json();
    setActing(null);

    if (!res.ok) return showToast(data.error, "error");

    showToast(` Claimed ${Number(data.claimed).toFixed(8)} ${data.coin}!`, "success");
    await loadData();
  };

  // ─────────────────────────────────────────────
  // Unstake
  // ─────────────────────────────────────────────
  const handleUnstake = async (pos: StakingPosition, force = false) => {
    setActing(pos.id);

    const res = await fetch("/api/user/staking/unstake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position_id: pos.id, force }),
    });

    const data = await res.json();
    setActing(null);

    if (data.warning && !force) {
      setUnstakeConfirm(pos);
      return;
    }

    if (!res.ok) return showToast(data.error, "error");

    setUnstakeConfirm(null);
    showToast(data.message, "success");
    await loadData();
  };

  // ─────────────────────────────────────────────
  // Loading
  // ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
          <p className="text-sm text-white/40">Loading staking…</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <div>
      <PageHeading title="Staking" subtitle="Stake any coin and earn passive rewards." />

      {/* Stats */}
      <StakingStats positions={positions} />
      {/* Stake Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StakeForm
          wallets={wallets}
          terms={terms}
          selectedCoin={selectedCoin}
          selectedTerm={selectedTerm}
          amount={amount}
          acting={acting}
          availableBal={availableBal}
          dailyEst={dailyEst}
          totalEst={totalEst}
          setSelectedCoin={setSelectedCoin}
          setSelectedTerm={setSelectedTerm}
          setAmount={setAmount}
          handleStake={handleStake}
          coinIcons={coinIcons}
        />

        {/* Active Stakes */}
        <ActiveStakes
          active={active}
          acting={acting}
          handleClaim={handleClaim}
        />
      </div>

      {/* Completed Stakes */}
      <CompletedStakes completed={completed} />

      {/* Unstake Modal */}
      <UnstakeModal
        unstakeConfirm={unstakeConfirm}
        setUnstakeConfirm={setUnstakeConfirm}
        handleUnstake={handleUnstake}
      />
    </div>
  );
}
