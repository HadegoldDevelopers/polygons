"use client";

import { PricingPlan } from "@/hooks/usePricing";

interface Props {
  amount: string;
  setAmount: (v: string) => void;
  balance: number;
  plans: PricingPlan[];
  selectedPlan: PricingPlan | null;
  setSelectedPlan: (p: PricingPlan) => void;
  daily: string;
  monthly: string;
  loadingAction: boolean;
  handleStake: () => void; // keep name for now, semantics = "start investment"
}

export function PricingForm({
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
        Investment Plans
      </p>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
          Amount to invest (USD)
        </label>
        <div className="relative">
          <input
            type="number"
            className="field pr-16"
            placeholder={`Min. ${selectedPlan?.min_deposit ?? 0} USD`}
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
          Available: ${balance.toLocaleString()}
        </p>
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
          Choose plan
        </label>
        <div className="flex flex-col gap-2">
          {plans.map((p) => {
  const isSelected = selectedPlan?.id === p.id;

  return (
    <div key={p.id} className="rounded-xl overflow-hidden border border-white/8">
      {/* Plan Button */}
      <button
        onClick={() => setSelectedPlan(p)}
        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold transition-all ${
          isSelected
            ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
            : "bg-[#1a1a24] hover:border-white/20"
        }`}
      >
        <span>{p.name ?? `${p.duration_days} days`}</span>

        <span className={isSelected ? "text-[#FF7900]" : "text-[#00d4aa]"}>
          {p.daily_profit}% daily
        </span>
      </button>

      {/* Dropdown Description */}
      {isSelected && p.notes && (
        <div className="px-4 py-3 bg-[#111118] text-xs text-white/60 border-t border-white/10 animate-slideDown">
          {p.notes}
        </div>
      )}
    </div>
  );
})}
        </div>
      </div>

      <div className="bg-[#1a1a24] rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/45">Est. daily earnings</span>
          <span className="font-bold text-[#00d4aa]">~${daily} / day</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/45">Est. 30‑day earnings</span>
          <span className="font-bold text-[#00d4aa]">~${monthly} / 30 days</span>
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={handleStake}
        disabled={loadingAction}
      >
        {loadingAction ? (
          <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
        ) : (
          "Start investment"
        )}
      </button>
    </div>
  );
}
