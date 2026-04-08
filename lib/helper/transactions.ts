import { supabaseServer } from "@/lib/supabase/supabaseServer";

export type TransactionType =
  | "Deposit"
  | "Withdraw"
  | "Swap"
  | "Staking"
  | "Fee"
  | "Bonus";

export type TransactionDirection = "in" | "out" | "swap";

interface RecordTransactionParams {
  user_id: string;
  type: TransactionType;
  direction: TransactionDirection;
  coin: string;
  amount: number;
  usd?: number | null;
  from_addr?: string | null;
  hash?: string | null;
  status?: "pending" | "confirmed" | "failed";
  gateway?: string | null;
  session_id?: string | null;
  metadata?: Record<string, unknown>;
}

export async function recordTransaction(params: RecordTransactionParams) {
  const supabase = await supabaseServer();

  const payload = {
    user_id: params.user_id,
    type: params.type,
    direction: params.direction,
    coin: params.coin,
    amount: params.amount,
    usd: params.usd ?? null,
    from_addr: params.from_addr ?? null,
    hash: params.hash ?? null,
    status: params.status ?? "confirmed",
    gateway: params.gateway ?? null,
    session_id: params.session_id ?? null,
    metadata: params.metadata ?? {},
  };

  const { error } = await supabase.from("transactions").insert(payload);

  if (error) {
    console.error("Failed to record transaction:", error);
    throw new Error("Transaction insert failed");
  }

  return true;
}
