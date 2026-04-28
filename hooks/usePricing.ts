// hooks/usePricing.ts
import { useEffect, useState, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────
export interface PricingPlan {
  id:             string;
  name:           string;
  min_deposit:    number;
  max_deposit?:   number;
  apr?:           number;
  duration_days:  number;
  daily_profit:   number;
  referral_bonus?: number;
  notes?:         string[];
}

export interface PricingPosition {
  id:                     string;
  user_id:                string;
  amount:                 number;
  daily_profit_snapshot:  number;
  duration_days_snapshot: number;
  earned_so_far:          number;
  status:                 string;
  created_at:             string;
  end_date:               string;
  staking_plans?: {
    id:            string;
    name:          string;
    duration_days: number;
    daily_profit:  number;
  };

  // Computed fields — added after fetch
  earned?:    number;
  days_left?: number;
  progress?:  number;
}

export interface HistoryItem {
  id:         string;
  amount:     number;
  event_type: string;
  created_at: string;
}

// ── Live earned calculation ────────────────────────────────────────
// Works from second 1 — no cron, no Math.floor
export function computeLiveEarned(p: PricingPosition): number {
  const daily  = Number(p.daily_profit_snapshot ?? 0);
  const amount = Number(p.amount ?? 0);

  if (daily <= 0 || amount <= 0) return 0;

  const created   = new Date(p.created_at).getTime();
  const end       = new Date(p.end_date).getTime();
  const now       = Date.now();
  const calcUntil = Math.min(now, end);

  // NO Math.floor — decimal days so new plans show accrual immediately
  const daysElapsed = Math.max((calcUntil - created) / 86400000, 0);
  const liveCalc    = amount * (daily / 100) * daysElapsed;
  const dbEarned    = Number(p.earned_so_far ?? 0);

  return Math.max(liveCalc, dbEarned);
}

export function computePosition(p: PricingPosition): PricingPosition {
  const duration    = Number(p.duration_days_snapshot ?? 0);
  const created     = new Date(p.created_at).getTime();
  const end         = new Date(p.end_date).getTime();
  const now         = Date.now();
  const daysLeft    = Math.max(Math.ceil((end - now) / 86400000), 0);
  const daysElapsed = Math.max((now - created) / 86400000, 0);
  const progress    = duration > 0 ? Math.min((daysElapsed / duration) * 100, 100) : 0;
  const earned      = computeLiveEarned(p);

  return { ...p, earned, days_left: daysLeft, progress };
}

// ── Hook ───────────────────────────────────────────────────────────
export function usePricing(showToast: (msg: string, type: string) => void) {
  const [loadingPage,   setLoadingPage]   = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [plans,         setPlans]         = useState<PricingPlan[]>([]);
  const [positions,     setPositions]     = useState<PricingPosition[]>([]);
  const [history,       setHistory]       = useState<HistoryItem[]>([]);
  const [balance,       setBalance]       = useState<number>(0);

  // ── Load positions + balance ─────────────────────────────────────
  // Uses activity route — the ONLY route that has both positions AND balance
  const loadPositions = useCallback(async () => {
    try {
      const res  = await fetch("/api/user/pricing/activity");
      const data = await res.json();

      // Apply live earned computation to every position
      setPositions((data.positions ?? []).map(computePosition));
      setBalance(data.balance ?? 0);
    } catch {
      showToast("Failed to reload positions", "error");
    }
  }, []);

  // ── Initial load ─────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const [plansRes, activityRes, historyRes] = await Promise.all([
          fetch("/api/user/pricing/plans"),
          fetch("/api/user/pricing/activity"), 
          fetch("/api/user/pricing/history"),
        ]);

        const { plans: p }                     = await plansRes.json();
        const { positions: pos, balance: bal } = await activityRes.json();
        const { history: hist }                = await historyRes.json();

        setPlans(p ?? []);
        setPositions((pos ?? []).map(computePosition));  // live earned applied
        setBalance(bal ?? 0);
        setHistory(hist ?? []);

      } catch {
        showToast("Failed to load pricing data", "error");
      } finally {
        setLoadingPage(false);
      }
    };

    load();
  }, []);

  // ── Recompute earned every 60 seconds ────────────────────────────
  // So the displayed earned ticks up without needing a full reload
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) => prev.map(computePosition));
    }, 60000);
    return () => clearInterval(interval);
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