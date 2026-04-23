// components/dashboard/RecentActivity.tsx
"use client";
import Link from "next/link";
import { Badge } from "@/components/ui";

interface Transaction {
  id:         string;
  type:       string;
  coin:       string;
  amount:     number;
  status:     "confirmed" | "pending" | "failed";
  direction:  "in" | "out";
  created_at: string;
}

interface Props {
  transactions: Transaction[];
}

const txIcons: Record<string, string> = {
  Deposit: "⬇", Withdraw: "⬆", Swap: "🔄", Staking: "🪙",
};
const txBg: Record<string, string> = {
  Deposit:  "bg-[#00d4aa]/10",
  Withdraw: "bg-[#ff4d6a]/10",
  Swap:     "bg-[#FF7900]/10",
  Staking:  "bg-[#FF7900]/10",
};

export default function RecentActivity({ transactions }: Props) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
          Recent Activity
        </p>
        <Link
          href="/dashboard/transactions"
          className="text-xs text-[#FF7900] font-bold hover:underline"
        >
          View all →
        </Link>
      </div>

      {transactions.length === 0 ? (
        <p className="text-sm text-white/30 text-center py-6">No transactions yet</p>
      ) : (
        <div className="divide-y divide-white/8">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 py-3">
              {/* Icon */}
              <div
                className={`w-9 h-9 rounded-xl ${
                  txBg[tx.type] ?? "bg-white/10"
                } flex items-center justify-center text-base flex-shrink-0`}
              >
                {txIcons[tx.type] ?? "•"}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold">{tx.type}</p>
                <p className="text-xs text-white/40">
                  {new Date(tx.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* Amount + badge */}
              <div className="text-right flex-shrink-0">
                <p
                  className={`text-sm font-bold ${
                    tx.direction === "in" ? "text-[#00d4aa]" : "text-[#ff4d6a]"
                  }`}
                >
                  {tx.direction === "in" ? "+" : "-"}
                  {Math.abs(tx.amount).toLocaleString()} {tx.coin}
                </p>
                <Badge status={tx.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
