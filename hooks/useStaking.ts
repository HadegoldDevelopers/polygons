import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
// Types (inside the hook file)
// ─────────────────────────────────────────────
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

export interface StakingPlansResponse {
  plans: StakingPlan[];
}

export interface StakingPositionResponse {
  positions: StakingPosition[];
  balance: number;
}

export interface StakingHistoryResponse {
  history: HistoryItem[];
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────
export function useStaking(showToast: (msg: string, type: string) => void) {
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const [plans, setPlans] = useState<StakingPlan[]>([]);
  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [balance, setBalance] = useState<number>(0);

  const loadPositions = async () => {
    const res = await fetch("/api/staking/position");
    const data: StakingPositionResponse = await res.json();

    setPositions(data.positions ?? []);
    setBalance(data.balance ?? 0);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [p, pos, h] = await Promise.all([
          fetch("/api/staking/plans"),
          fetch("/api/staking/position"),
          fetch("/api/staking/history"),
        ]);

        const plansData: StakingPlansResponse = await p.json();
        const posData: StakingPositionResponse = await pos.json();
        const histData: StakingHistoryResponse = await h.json();

        setPlans(plansData.plans ?? []);
        setPositions(posData.positions ?? []);
        setBalance(posData.balance ?? 0);
        setHistory(histData.history ?? []);
      } catch {
        showToast("Failed to load staking data", "error");
      } finally {
        setLoadingPage(false);
      }
    };

    load();
  }, []);

  return {
    loadingPage,
    loadingAction,
    setLoadingAction,
    plans,
    positions,
    history,
    balance,
    loadPositions,
  };
}
