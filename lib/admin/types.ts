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
  profiles?: { name: string; email: string };
  staking_plans?: { name: string; apr: number };
}

export interface WithdrawalRequest {
  id: string;
  user_id: string;
  coin: string;
  network: string;
  amount: number;
  usd_value?: number;
  to_address: string;
  status: string;
  tx_hash?: string;
  admin_note?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  profiles?: { name: string; email: string };
}

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