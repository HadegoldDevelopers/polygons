import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
// Types (inside the hook file)
// ─────────────────────────────────────────────
export interface PricingPlan {
  id: string;
  name: string;
  min_deposit: number;
  max_deposit?: number;
  apr?: number;
  duration_days: number;
  daily_profit: number;
  referral_bonus?: number;
  notes?: string[];
}

export interface PricingPosition {
  id: string;
  user_id: string;
  amount: number;

  // snapshots from DB
  daily_profit_snapshot: number;
  duration_days_snapshot: number;

  status: string;
  created_at: string;
  end_date: string;

  // joined plan
  staking_plans?: {
    id: string;
    name: string;
    duration_days: number;
    daily_profit: number;
  };

  // frontend‑computed fields
  earned: number;
  days_left: number;
  progress: number;
}





export interface HistoryItem {
  id: string;
  amount: number;
  event_type: string;
  created_at: string;
}

export interface PricingPlansResponse {
  plans: PricingPlan[];
}

export interface PricingPositionResponse {
  positions: PricingPosition[];
  balance: number;
}

export interface PricingHistoryResponse {
  history: HistoryItem[];
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────
export function usePricing(showToast: (msg: string, type: string) => void) {
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [positions, setPositions] = useState<PricingPosition[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [balance, setBalance] = useState<number>(0);

  const loadPositions = async () => {
    const res = await fetch("/api/user/pricing/position");
    const data: PricingPositionResponse = await res.json();

    setPositions(data.positions ?? []);
    setBalance(data.balance ?? 0);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [p, pos, h] = await Promise.all([
          fetch("/api/user/pricing/plans"),
          fetch("/api/user/pricing/position"),
          fetch("/api/user/pricing/history"),
        ]);

        const plansData: PricingPlansResponse = await p.json();
        const posData: PricingPositionResponse = await pos.json();
        const histData: PricingHistoryResponse = await h.json();

        setPlans(plansData.plans ?? []);
        setPositions(posData.positions ?? []);
        setBalance(posData.balance ?? 0);
        setHistory(histData.history ?? []);
      } catch {
        showToast("Failed to load pricing data", "error");
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
