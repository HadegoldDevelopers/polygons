import { useEffect, useState } from "react";
import {
  StakingTerm,
  StakingPosition,
  ApiListResponse,
  StakeClaimResponse,
} from "@/lib/staking/types";

export function useStaking(showToast: (msg: string, type: string) => void) {
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const [terms, setTerms] = useState<StakingTerm[]>([]);
  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const [balance, setBalance] = useState<number>(0);

  // ─────────────────────────────────────────────
  // Load positions + balance
  // ─────────────────────────────────────────────
  const loadPositions = async () => {
    try {
      const res = await fetch("/api/user/staking/position");
      const json = await res.json();

      setPositions(json.data ?? []);
      setBalance(json.balance ?? 0);
    } catch (err) {
      console.error(err);
      showToast("Failed to load positions", "error");
    }
  };

  // ─────────────────────────────────────────────
  // Load everything
  // ─────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const [t, p, h] = await Promise.all([
          fetch("/api/user/staking/terms"),
          fetch("/api/user/staking/position"),
          fetch("/api/user/staking/history"),
        ]);

        const termsData = (await t.json()) as ApiListResponse<StakingTerm>;
        const posData = await p.json();
        const histData = await h.json();

        setTerms(termsData.data ?? []);
        setPositions(posData.data ?? []);
        setBalance(posData.balance ?? 0);
      } catch (err) {
        console.error(err);
        showToast("Failed to load staking data", "error");
      } finally {
        setLoadingPage(false);
      }
    };

    load();
  }, []);

  // ─────────────────────────────────────────────
  // Stake
  // ─────────────────────────────────────────────
  const stake = async (amount: number, coin: string, termId: string) => {
    setLoadingAction(true);

    const res = await fetch("/api/user/staking/stake", {
      method: "POST",
      body: JSON.stringify({
        amount,
        coin,
        term_id: termId, // FIXED
      }),
    });

    const json = await res.json();
    setLoadingAction(false);

    if (!res.ok) {
      showToast(json.error ?? "Failed to stake", "error");
      return false;
    }

    showToast("Staking successful!", "success");
    await loadPositions();
    return true;
  };

  // ─────────────────────────────────────────────
  // Claim
  // ─────────────────────────────────────────────
  const claim = async (positionId: string) => {
    setLoadingAction(true);

    const res = await fetch("/api/user/staking/claim", {
      method: "POST",
      body: JSON.stringify({
        position_id: positionId, // FIXED
      }),
    });

    const json = (await res.json()) as StakeClaimResponse;
    setLoadingAction(false);

    if (!res.ok) {
      showToast(json.error ?? "Failed to claim rewards", "error");
      return false;
    }

    showToast("Rewards claimed!", "success");
    await loadPositions();
    return true;
  };

  return {
    loadingPage,
    loadingAction,
    terms,
    positions,
    history,
    balance,
    loadPositions,
    stake,
    claim,
  };
}
