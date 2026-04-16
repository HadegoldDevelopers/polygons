export interface StakingTerm {
  id: string;
  name: string;
  months: number;
  apr: number;
  is_active: boolean;
  created_at: string;
}

export type StakingStatus = "active" | "completed" | "cancelled";
export interface StakingPlan {
  id: string;
  name: string;
  min_deposit: number;
  max_deposit?: number;
  apr: number;
  notes?: string[];
}
export interface StakingPosition {
  id: string;
  user_id: string;
  coin: string;
  amount: number;
  term_id: string;
  apr_snapshot: number;
  start_at: string;
  end_at: string;
  status: StakingStatus;
  last_accrued_at: string;
  accrued_reward: number;
  claimed_reward: number;
  created_at: string;

  staking_terms?: StakingTerm;
}

export interface StakingRewardEvent {
  id: string;
  position_id: string;
  user_id: string;
  kind: "claim";
  amount: number;
  coin: string;
  created_at: string;
}

export interface StakeFormInput {
  coin: string;
  amount: number;
  termId: string;
}

export interface ApiListResponse<T> {
  data: T[];
  error?: string;
}

export interface ApiSingleResponse<T> {
  data: T;
  error?: string;
}

export interface StakeClaimResponse {
  claimable: number;
  status: StakingStatus;
  error?: string;
}
export interface Wallet {
  symbol: string;
  amount: number;
  usd_value: number;
  price: number;
}