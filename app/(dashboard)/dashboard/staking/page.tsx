"use client";
import { useState } from "react";
import { PageHeading, StatCard } from "@/components/ui";
import { useToast } from "@/context/ToastContext";
import { staking } from "@/lib/mockData";

const plans = [
  { label: "30 days",  apy: "70%",  multiplier: 1    },
  { label: "90 days",  apy: "100%", multiplier: 1.43 },
  { label: "180 days", apy: "150%", multiplier: 2.14 },
];

export default function StakingPage() {
  const { showToast } = useToast();
  const [amount, setAmount]   = useState("");
  const [plan,   setPlan]     = useState(plans[0]);
  const [loading, setLoading] = useState(false);

  const daily   = amount ? ((parseFloat(amount) * (parseInt(plan.apy) / 100)) / 365).toFixed(1) : "0";
  const monthly = amount ? ((parseFloat(amount) * (parseInt(plan.apy) / 100)) / 12).toFixed(1)  : "0";

  const handleStake = async () => {
    if (!amount || parseFloat(amount) < 1000) {
      showToast("Minimum stake is 1,000 PLUTO", "error"); return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    showToast(`${parseFloat(amount).toLocaleString()} PLUTO staked! 🔒`, "success");
    setAmount("");
  };

  return (
    <div>
      <PageHeading title="Staking" subtitle="Stake PLUTO to earn passive rewards." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="🔒" value={`${staking.staked.toLocaleString()}`} label="PLUTO Staked" />
        <StatCard icon="🎁" value={`${staking.earned.toLocaleString()}`} label="PLUTO Earned" change="This month" changeDir="up" />
        <StatCard icon="📈" value={`${staking.apy}%`}  label="Current APY" />
        <StatCard icon="📅" value={`${staking.lockDays}d`} label="Lock Period" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stake form */}
        <div className="card space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Stake More PLUTO</p>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Amount to Stake</label>
            <div className="relative">
              <input
                type="number"
                className="field pr-16"
                placeholder="Min. 1,000 PLUTO"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={() => setAmount("28290")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#FF7900] hover:underline"
              >
                MAX
              </button>
            </div>
            <p className="text-xs text-white/40 mt-1.5">Available: 28,290 PLUTO (48,290 total − 20,000 staked)</p>
          </div>

          {/* Plan selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">Lock Period</label>
            <div className="flex flex-col gap-2">
              {plans.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setPlan(p)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                    plan.label === p.label
                      ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                      : "bg-[#1a1a24] border-white/8 hover:border-white/20"
                  }`}
                >
                  <span>{p.label}</span>
                  <span className={plan.label === p.label ? "text-[#FF7900]" : "text-[#00d4aa]"}>{p.apy} APY</span>
                </button>
              ))}
            </div>
          </div>

          {/* Estimate */}
          <div className="bg-[#1a1a24] rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/45">Est. daily reward</span>
              <span className="font-bold text-[#00d4aa]">~{daily} PLUTO</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/45">Est. monthly reward</span>
              <span className="font-bold text-[#00d4aa]">~{monthly} PLUTO</span>
            </div>
          </div>

          <button className="btn-primary" onClick={handleStake} disabled={loading}>
            {loading ? (
              <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              "Stake PLUTO 🔒"
            )}
          </button>
        </div>

        {/* Active stake */}
        <div className="card space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Active Stake</p>

          <div className="bg-[#1a1a24] rounded-xl p-4 space-y-3">
            {[
              ["Staked amount",          `${staking.staked.toLocaleString()} PLUTO`],
              ["Unlocks in",             `${staking.daysLeft} days`],
              ["Accumulated rewards",    `${staking.earned.toLocaleString()} PLUTO`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-white/45">{k}</span>
                <span className={`font-bold ${k === "Unlocks in" ? "text-[#FF7900]" : k === "Accumulated rewards" ? "text-[#00d4aa]" : ""}`}>{v}</span>
              </div>
            ))}

            {/* Progress bar */}
            <div className="mt-2">
              <div className="h-1.5 bg-white/8 rounded-full">
                <div className="h-full rounded-full bg-[#FF7900]" style={{ width: `${staking.progress}%` }} />
              </div>
              <p className="text-xs text-white/40 mt-1.5">{staking.progress}% of lock period elapsed</p>
            </div>
          </div>

          <button
            className="btn-ghost w-full"
            onClick={() => showToast(`Rewards available in ${staking.daysLeft} days`, "info")}
          >
            🎁 Claim Rewards (Available in {staking.daysLeft}d)
          </button>

          <button
            className="w-full py-3 rounded-xl text-sm font-bold border border-[#ff4d6a]/30 text-[#ff4d6a] bg-[#ff4d6a]/8 hover:bg-[#ff4d6a]/15 transition-colors"
            onClick={() => showToast("Early unstake incurs a 10% penalty fee", "error")}
          >
            ⚠ Early Unstake (10% fee)
          </button>

          {/* Staking history */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">Staking History</p>
            <div className="space-y-2">
              {[
                { amount: "20,000", date: "Mar 1, 2024", status: "Active" },
                { amount: "10,000", date: "Jan 15, 2024", status: "Completed" },
              ].map((h, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/8 last:border-0 text-sm">
                  <div>
                    <p className="font-bold">{h.amount} PLUTO</p>
                    <p className="text-xs text-white/40">{h.date}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    h.status === "Active" ? "bg-[#FF7900]/15 text-[#FF7900]" : "bg-[#00d4aa]/10 text-[#00d4aa]"
                  }`}>
                    {h.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
