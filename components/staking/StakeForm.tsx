"use client";

import { StakingTerm, StakingPlan, Wallet } from "@/lib/staking/types";

interface Props {
  wallets: Wallet[];
  terms: StakingTerm[];
  selectedCoin: string;
  selectedTerm: StakingTerm | null;
  amount: string;
  acting: string | null;
  availableBal: number;
  dailyEst: string;
  totalEst: string;
  setSelectedCoin: (c: string) => void;
  setSelectedTerm: (t: StakingTerm) => void;
  setAmount: (v: string) => void;
  handleStake: () => void;
  coinIcons: Record<string, string>;
}

export default function StakeForm({
  wallets,
  terms,
  selectedCoin,
  selectedTerm,
  amount,
  acting,
  availableBal,
  dailyEst,
  totalEst,
  setSelectedCoin,
  setSelectedTerm,
  setAmount,
  handleStake,
  coinIcons,
}: Props) {
  return (
    <div className="card space-y-5">
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">New Stake</p>

      {/* Coin Selector */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
          Select Coin
        </label>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {wallets.map((w) => (
            <button
              key={w.symbol}
              onClick={() => { setSelectedCoin(w.symbol); setAmount(""); }}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                selectedCoin === w.symbol
                  ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                  : "bg-[#1a1a24] border-white/8 hover:border-white/20"
              }`}
            >
              <span className="text-lg">{coinIcons[w.symbol] ?? "🪙"}</span>
              <span>{w.symbol}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      {selectedCoin && (
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Amount
          </label>

          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              className="field pr-16"
              placeholder={`0.00 ${selectedCoin}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button
              onClick={() => setAmount(String(availableBal))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#FF7900] hover:underline"
            >
              MAX
            </button>
          </div>

          <p className="text-xs text-white/40 mt-1.5">
            Available: <strong className="text-white">{availableBal.toLocaleString()} {selectedCoin}</strong>
          </p>
        </div>
      )}

      {/* Term Selector */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
          Select Term
        </label>

        <div className="flex flex-col gap-2">
          {terms.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTerm(t)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                selectedTerm?.id === t.id
                  ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                  : "bg-[#1a1a24] border-white/8 hover:border-white/20"
              }`}
            >
              <span>{t.name}</span>
              <span className="text-[#00d4aa]">{t.apr}% APR</span>
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Rewards */}
      {amount && selectedTerm && (
        <div className="bg-[#1a1a24] rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/45">Daily Reward</span>
            <span className="font-bold text-[#00d4aa]">~{dailyEst} {selectedCoin}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-white/45">Total Reward</span>
            <span className="font-bold text-[#00d4aa]">~{totalEst} {selectedCoin}</span>
          </div>
        </div>
      )}

      {/* Stake Button */}
      <button
        className="btn-primary"
        onClick={handleStake}
        disabled={acting === "stake"}
      >
        {acting === "stake"
          ? <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          : "Stake Now 🔒"}
      </button>
    </div>
  );
}
