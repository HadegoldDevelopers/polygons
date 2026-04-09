"use client";

import { StakingPlan } from "@/hooks/useStaking";

interface Props {
  amount: string;
  setAmount: (v: string) => void;
  balance: number;
  plans: StakingPlan[];
  selectedPlan: StakingPlan | null;
  setSelectedPlan: (p: StakingPlan) => void;
  daily: string;
  monthly: string;
  loadingAction: boolean;
  handleStake: () => void;
}

export function StakeForm({
  amount,
  setAmount,
  balance,
  plans,
  selectedPlan,
  setSelectedPlan,
  daily,
  monthly,
  loadingAction,
  handleStake,
}: Props) {
  return (
    <div className="card space-y-5">
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
        Stake POLYCOGNI CAPITAL
      </p>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
          Amount to Stake
        </label>
        <div className="relative">
          <input
            type="number"
            className="field pr-16"
            placeholder={`Min. ${selectedPlan?.min_deposit ?? 0} POLYCOGNI CAPITAL`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={() => setAmount(String(balance))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#FF7900] hover:underline"
          >
            MAX
          </button>
        </div>
        <p className="text-xs text-white/40 mt-1.5">
          Available: {balance.toLocaleString()} POLYCOGNI CAPITAL
        </p>
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
          Choose Plan
        </label>
        <div className="flex flex-col gap-2">
          {plans.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlan(p)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                selectedPlan?.id === p.id
                  ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                  : "bg-[#1a1a24] border-white/8 hover:border-white/20"
              }`}
            >
              <span>{p.name ?? `${p.duration_days} days`}</span>
              <span
                className={
                  selectedPlan?.id === p.id
                    ? "text-[#FF7900]"
                    : "text-[#00d4aa]"
                }
              >
                {p.apr}% APY
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a24] rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/45">Est. daily reward</span>
          <span className="font-bold text-[#00d4aa]">~{daily} POLYCOGNI CAPITAL</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/45">Est. monthly reward</span>
          <span className="font-bold text-[#00d4aa]">~{monthly} POLYCOGNI CAPITAL</span>
        </div>
      </div>

      <button className="btn-primary" onClick={handleStake} disabled={loadingAction}>
        {loadingAction ? (
          <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
        ) : (
          "Stake POLYCOGNI CAPITAL 🔒"
        )}
      </button>
    </div>
  );
}
