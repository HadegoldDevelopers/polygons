"use client";

import { useEffect, useState } from "react";
import { PageHeading, Badge } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

const filters = ["All", "Deposit", "Withdraw", "Swap", "Staking"];
const txIcons = { Deposit: "⬇", Withdraw: "⬆", Swap: "🔄", Staking: "🪙" };

interface Transaction {
  id: string;
  type: "Deposit" | "Withdraw" | "Swap" | "Staking";
  amount: number;
  coin: string;
  direction: "in" | "out" | "swap";
  from_addr: string;
  hash: string;
  created_at: string;
  status: "confirmed" | "pending" | "failed";
}

export default function TransactionsPage() {
  const { showToast } = useToast();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filtering logic
  const filtered = transactions.filter((tx) => {
    const matchFilter = filter === "All" || tx.type === filter;
    const matchSearch =
      !search ||
      tx.hash?.toLowerCase().includes(search.toLowerCase()) ||
      tx.from_addr?.toLowerCase().includes(search.toLowerCase()) ||
      tx.type?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const copyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash).catch(() => {});
    showToast("Transaction hash copied!", "success");
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <PageHeading
          title="Transactions"
          subtitle="Complete history of your on-chain activity."
        />
        <button className="btn-ghost text-sm px-4 py-2.5">⬇ Export CSV</button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <input
          type="text"
          placeholder="🔍 Search hash, address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="field max-w-[240px] py-2 text-sm"
        />

        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition-all ${
              filter === f
                ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                : "bg-[#111118] border-white/8 text-white/50 hover:border-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card p-0 overflow-x-auto">
        {loading ? (
          <div className="text-center py-16 text-white/30">
            <div className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin mx-auto mb-3" />
            Loading transactions…
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  {[
                    "Type",
                    "Amount",
                    "From / To",
                    "Tx Hash",
                    "Date",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-bold uppercase tracking-widest text-white/35 px-5 py-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/8">
                {filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/2 transition-colors">
                    {/* Type */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
                            tx.type === "Deposit"
                              ? "bg-[#00d4aa]/10"
                              : tx.type === "Withdraw"
                              ? "bg-[#ff4d6a]/10"
                              : "bg-[#FF7900]/10"
                          }`}
                        >
                          {txIcons[tx.type]}
                        </div>
                        <span className="text-sm font-bold">{tx.type}</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td
                      className={`px-5 py-4 text-sm font-bold ${
                        tx.direction === "in"
                          ? "text-[#00d4aa]"
                          : tx.direction === "out"
                          ? "text-[#ff4d6a]"
                          : "text-[#FF7900]"
                      }`}
                    >
                      {tx.direction === "in" ? "+" : ""}
                      {Math.abs(tx.amount).toLocaleString()} {tx.coin}
                    </td>

                    {/* From / To */}
                    <td className="px-5 py-4 text-xs font-mono text-white/45">
                      {tx.from_addr || "—"}
                    </td>

                    {/* Hash */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() => copyHash(tx.hash)}
                        className="text-xs font-mono text-[#FF7900] hover:underline"
                      >
                        {tx.hash || "—"}
                      </button>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-xs text-white/45 whitespace-nowrap">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <Badge
                        status={
                          tx.status as "confirmed" | "pending" | "failed"
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-white/30">
                <div className="text-4xl mb-3">📭</div>
                <p className="font-semibold">No transactions found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
