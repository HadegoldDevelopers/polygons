/* -------------------------------------------------------------------------- */
/*                               USER / PROFILE                               */
/* -------------------------------------------------------------------------- */

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  is_banned: boolean;
  is_verified: boolean;
  banned_at?: string;
  ban_reason?: string;
  country?: string;
  phone?: string;
  created_at: string;
}

/* -------------------------------------------------------------------------- */
/*                               NOTIFICATIONS                                */
/* -------------------------------------------------------------------------- */

export interface AdminNotification {
  id: string;
  user_id: string | null;
  text: string;
  time: string;
  read: boolean;
  profiles?: {
    name: string;
    email?: string;
  } | null;
}

/* -------------------------------------------------------------------------- */
/*                       BASE TYPE FOR PLAN POSITIONS                         */
/* -------------------------------------------------------------------------- */

export interface BasePlanPosition {
  id: string;
  user_id: string;
  plan_id: string;
  amount: number;
  earned: number;
  status: string;
  created_at: string;

  profiles?: { name: string; email: string };
  staking_plans?: { name: string; apr: number };
}

/* -------------------------------------------------------------------------- */
/*                         ADMIN PLAN POSITION (RAW DB)                       */
/* -------------------------------------------------------------------------- */

export interface AdminPlanPosition extends BasePlanPosition {
  end_date: string;

  // Snapshot fields that exist in the DB and are required by the UI
  daily_profit_snapshot: number;
  duration_days_snapshot: number;
  earned_so_far: number;

  // Optional DB fields
  last_credited_at?: string | null;
}
/* -------------------------------------------------------------------------- */
/*                         PLAN POSITION FILTER / SORT TYPES                  */
/* -------------------------------------------------------------------------- */

export type StatusFilter = "all" | "active" | "completed" | "cancelled";

export type SortKey = "created_at" | "amount" | "end_date";


/* -------------------------------------------------------------------------- */
/*                     USER STAKING POSITION (COMPUTED FIELDS)               */
/* -------------------------------------------------------------------------- */

export interface StakingPosition extends BasePlanPosition {
  apy: number;
  lock_days: number;
  days_left: number;
  progress: number;
}

/* -------------------------------------------------------------------------- */
/*                                  SETTINGS                                  */
/* -------------------------------------------------------------------------- */

export interface AdminSettings {
  id: string;
  now_api_key?: string;
  now_ipn_secret?: string;
  now_public_key?: string;
  updated_at: string;
}

/* -------------------------------------------------------------------------- */
/*                               TRANSACTIONS                                 */
/* -------------------------------------------------------------------------- */

export interface AdminTransaction {
  id: string;
  user_id: string;
  type: string;
  coin: string;
  amount: number;
  usd: number;
  from_addr: string;
  hash: string;
  status: string;
  direction: string;
  created_at: string;

  profiles?: { name: string; email: string };
}

/* -------------------------------------------------------------------------- */
/*                                  WALLETS                                   */
/* -------------------------------------------------------------------------- */

export interface AdminWallet {
  id: string;
  user_id: string;
  symbol: string;
  amount: number;
  usd_value: number;
  price: number;
  change_pct: number;
  address: string;

  profiles?: { name: string; email: string };
}

/* -------------------------------------------------------------------------- */
/*                               DEPOSIT SESSIONS                             */
/* -------------------------------------------------------------------------- */

export interface AdminDepositSession {
  id: string;
  user_id: string;
  coin: string;
  network: string;
  pay_address: string;
  pay_amount: number;
  pay_currency: string;
  status: string;
  actually_paid?: number;
  created_at: string;
  updated_at?: string;

  profiles?: { name: string; email: string };
}

/* -------------------------------------------------------------------------- */
/*                                STAKING PLANS                               */
/* -------------------------------------------------------------------------- */

export interface StakingPlan {
  id: string;
  name: string;
  min_deposit: number;
  max_deposit?: number;
  daily_profit?: number;
  apr?: number;
  duration_days?: number;
  referral_bonus?: number;
  notes?: string[];
  created_at: string;
}

/* -------------------------------------------------------------------------- */
/*                             WITHDRAWAL REQUESTS                            */
/* -------------------------------------------------------------------------- */

export interface WithdrawalRequest {
  id: string;
  user_id: string;
  token: string;
  network: string;
  amount: number;
  usd_value?: number;
  address: string;
  status: string;
  tx_hash?: string;
  admin_note?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;

  profiles?: { name: string; email: string };
}

/* -------------------------------------------------------------------------- */
/*                                COIN MARKETS                                */
/* -------------------------------------------------------------------------- */

export interface CoinMarket {
  symbol: string;
  name: string;
  icon: string;
  price: number;
  change_24h: number;
  change_7d: number;
  market_cap: number;
  volume_24h: number;
  circulating_supply: number;
  updated_at: string;
}

/* -------------------------------------------------------------------------- */
/*                                ANALYTICS                                   */
/* -------------------------------------------------------------------------- */

export interface AnalyticsStats {
  totalUsers: number;
  totalVolume: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingWithdrawals: number;
  activeStakes: number;
  totalStaked: number;
  newUsersToday: number;
}
