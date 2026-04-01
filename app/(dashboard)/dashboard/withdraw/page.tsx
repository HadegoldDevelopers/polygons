"use client";
import { useState } from "react";
import { PageHeading } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

const steps = ["Details", "Confirm", "Done"];
const tokenOptions = [
  { symbol: "PLUTO", icon: "🪙", balance: "48,290", usd: "$9,658.00" },
  { symbol: "BTC",   icon: "₿",  balance: "0.0421",  usd: "$2,841.75" },
  { symbol: "ETH",   icon: "Ξ",  balance: "0.892",   usd: "$3,460.96" },
  { symbol: "USDT",  icon: "$",  balance: "100.00",  usd: "$100.00"   },
];
const networks = ["Ethereum (ERC-20)", "BSC (BEP-20)", "PlutoChain L2"];

export default function WithdrawPage() {
  const { showToast } = useToast();
  const [step, setStep]       = useState(0);
  const [token, setToken]     = useState(tokenOptions[0]);
  const [address, setAddress] = useState("");
  const [amount, setAmount]   = useState("");
  const [network, setNetwork] = useState(networks[0]);

  const handleContinue = () => {
    if (!address) { showToast("Please enter a recipient address", "error"); return; }
    if (!amount || parseFloat(amount) <= 0) { showToast("Please enter a valid amount", "error"); return; }
    setStep(1);
  };

  const handleConfirm = async () => {
    setStep(2);
    showToast("Withdrawal submitted! Processing in ~10 min ⬆", "success");
  };

  const handleReset = () => { setStep(0); setAddress(""); setAmount(""); };

  return (
    <div>
      <PageHeading title="Withdraw Funds" subtitle="Send your crypto to an external wallet." />

      <div className="max-w-[520px]">
        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                  i < step  ? "bg-[#FF7900] border-[#FF7900] text-black"
                  : i === step ? "border-[#FF7900] text-[#FF7900]"
                  : "border-white/15 text-white/30"
                }`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <p className={`text-[11px] mt-1 font-bold ${i === step ? "text-[#FF7900]" : "text-white/30"}`}>{s}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-5 transition-colors ${i < step ? "bg-[#FF7900]" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0 — Details */}
        {step === 0 && (
          <div className="card space-y-5">
            {/* Token select */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">Select Token</label>
              <div className="flex gap-2 flex-wrap">
                {tokenOptions.map((t) => (
                  <button
                    key={t.symbol}
                    onClick={() => setToken(t)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold border transition-all ${
                      token.symbol === t.symbol
                        ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                        : "bg-[#1a1a24] border-white/8"
                    }`}
                  >
                    <span>{t.icon}</span> {t.symbol}
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/40 mt-2">
                Available: <strong className="text-white">{token.balance} {token.symbol}</strong> ≈ {token.usd}
              </p>
            </div>

            {/* Address */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Recipient Address</label>
              <input
                type="text"
                className="field"
                placeholder="0x... or ENS name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  className="field pr-16"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  onClick={() => setAmount(token.balance.replace(",", ""))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#FF7900] hover:underline"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Network */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Network</label>
              <select
                className="field cursor-pointer"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                {networks.map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>

            {/* Fee summary */}
            <div className="bg-[#1a1a24] rounded-xl p-4 space-y-2">
              {[
                ["Network fee",     "~$2.40 (0.012 ETH)"],
                ["You will receive",`${amount || "0"} ${token.symbol}`],
                ["Processing time", "~10 minutes"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/45">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={handleContinue}>Continue →</button>
          </div>
        )}

        {/* Step 1 — Confirm */}
        {step === 1 && (
          <div className="card space-y-5">
            <div className="text-center mb-2">
              <div className="text-4xl mb-3">⬆️</div>
              <h3 className="text-xl font-black mb-1">Confirm Withdrawal</h3>
              <p className="text-sm text-white/40">Please review the details before confirming</p>
            </div>

            <div className="bg-[#1a1a24] rounded-xl p-4 space-y-3">
              {[
                ["Token",        `${token.icon} ${token.symbol}`],
                ["Amount",       `${amount} ${token.symbol}`],
                ["To",           address],
                ["Network",      network],
                ["Network fee",  "~$2.40"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/45">{k}</span>
                  <span className="font-semibold font-mono text-right max-w-[200px] break-all">{v}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#ff4d6a]/8 border border-[#ff4d6a]/20 rounded-xl p-4 text-sm text-[#ff4d6a]">
              ⚠️ This action cannot be undone. Make sure the address is correct.
            </div>

            <div className="flex gap-3">
              <button className="btn-ghost flex-1" onClick={() => setStep(0)}>← Back</button>
              <button className="btn-primary flex-1" onClick={handleConfirm}>Confirm Withdrawal</button>
            </div>
          </div>
        )}

        {/* Step 2 — Done */}
        {step === 2 && (
          <div className="card text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#00d4aa]/15 flex items-center justify-center text-3xl mx-auto">✓</div>
            <h3 className="text-xl font-black text-[#00d4aa]">Withdrawal Submitted!</h3>
            <p className="text-sm text-white/45">
              Your withdrawal of <strong className="text-white">{amount} {token.symbol}</strong> is being processed.
              Expected arrival in ~10 minutes.
            </p>
            <div className="bg-[#1a1a24] rounded-xl p-4 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/45">Status</span><span className="text-yellow-400 font-bold">Pending</span></div>
              <div className="flex justify-between"><span className="text-white/45">Amount</span><span className="font-bold">{amount} {token.symbol}</span></div>
              <div className="flex justify-between"><span className="text-white/45">Tx Hash</span><span className="font-mono text-[#FF7900] text-xs">0xabc1...def2</span></div>
            </div>
            <button className="btn-primary" onClick={handleReset}>Make Another Withdrawal</button>
          </div>
        )}
      </div>
    </div>
  );
}
