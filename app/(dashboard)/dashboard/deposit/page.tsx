"use client";
import { useState } from "react";
import { PageHeading, Badge } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

const coins = ["PLUTO","BTC","ETH","USDT"] as const;

const coinIcons= { PLUTO:"🪙", BTC:"₿", ETH:"Ξ", USDT:"$" };
const networks = ["Ethereum (ERC-20)","BSC (BEP-20)","PlutoChain L2"];

const recentDeposits: Array<{ coin: string; amount: number; from: string; status: "confirmed" | "pending" | "failed" }> = [
  { coin:"PLUTO", amount:5000,  from:"0x742d...B12C", status:"confirmed" },
  { coin:"PLUTO", amount:10000, from:"0xA3f8...D90E", status:"confirmed" },
];

const ADDR = "0x1f385578266496cd4a4c435a6bb2a60b9bd9ceef";

export default function DepositPage() {
  const { showToast } = useToast();
  const [selectedCoin, setSelectedCoin] = useState("PLUTO");
  const [selectedNet,  setSelectedNet]  = useState(networks[0]);
  const [copied, setCopied] = useState(false);

  const copyAddr = () => {
    navigator.clipboard?.writeText(ADDR).catch(() => {});
    setCopied(true);
    showToast("Address copied to clipboard! 📋", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <PageHeading title="Deposit Funds" subtitle="Send crypto to your PlutoChain wallet address below." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — QR + address */}
        <div className="card">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-5">Receive Address</p>

          {/* Coin selector */}
          <div className="flex gap-2 flex-wrap mb-5">
            {coins.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCoin(c)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                  selectedCoin === c
                    ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                    : "bg-[#1a1a24] border-white/8 hover:border-[#FF7900]/25"
                }`}
              >
                <span className="text-lg">{coinIcons[c]}</span> {c}
              </button>
            ))}
          </div>

          {/* Network tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            {networks.map((n) => (
              <button
                key={n}
                onClick={() => setSelectedNet(n)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  selectedNet === n
                    ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                    : "bg-[#1a1a24] border-white/8"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {/* QR code */}
          <div className="flex justify-center mb-4">
            <div className="w-44 h-44 bg-white rounded-2xl flex items-center justify-center p-3">
              <div
                className="w-full h-full rounded-lg"
                style={{
                  background: "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 0 0 / 11px 11px",
                }}
              />
            </div>
          </div>
          <p className="text-center text-xs text-white/40 mb-4">
            Scan QR or copy address below
          </p>

          {/* Address box */}
          <div className="bg-[#1a1a24] border border-white/8 rounded-xl p-4 font-mono text-xs break-all leading-relaxed mb-3">
            {ADDR}
          </div>
          <button
            onClick={copyAddr}
            className={`w-full py-3 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              copied
                ? "bg-[#00d4aa]/15 border-[#00d4aa]/40 text-[#00d4aa]"
                : "bg-[#FF7900]/10 border-[#FF7900]/35 text-[#FF7900] hover:bg-[#FF7900]/20"
            }`}
          >
            {copied ? "✓ Copied!" : "📋 Copy Address"}
          </button>
        </div>

        {/* Right — info + recent */}
        <div className="flex flex-col gap-4">
          <div className="card">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">Deposit Information</p>
            {[
              ["Network",               selectedNet],
              ["Minimum deposit",       `100 ${selectedCoin}`],
              ["Confirmations required","12 blocks"],
              ["Estimated arrival",     "~5 minutes"],
              ["Network fee",           "Paid by sender"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-2.5 border-b border-white/8 last:border-0 text-sm">
                <span className="text-white/45">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#FF7900]/35 bg-[#FF7900]/6 p-5">
            <p className="text-sm font-bold text-[#FF7900] mb-3">⚠️ Important</p>
            <ul className="text-sm text-white/50 space-y-1.5 list-disc list-inside">
              <li>Only send <strong className="text-white">{selectedCoin}</strong> to this address</li>
              <li>Sending wrong tokens results in permanent loss</li>
              <li>Minimum deposit is 100 {selectedCoin}</li>
              <li>Deposits below minimum will not be credited</li>
            </ul>
          </div>

          <div className="card">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">Recent Deposits</p>
            <div className="divide-y divide-white/8">
              {recentDeposits.map((d, i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center text-base flex-shrink-0">⬇</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{d.coin} Deposit</p>
                    <p className="text-xs text-white/40 font-mono">From: {d.from}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#00d4aa]">+{d.amount.toLocaleString()}</p>
                    <Badge status={d.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
