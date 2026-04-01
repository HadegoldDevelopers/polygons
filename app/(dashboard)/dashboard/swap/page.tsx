"use client";
import { useState } from "react";
import { Badge } from "@/components/ui";
import { useToast } from "@/context/ToastContext";
import { coins, swapRates } from "@/lib/mockData";

// ── Types ──────────────────────────────────────────────────────────
interface Coin {
  symbol: string;
  name: string;
  icon: string;
  color: string;
  balance: number;
  price: number;
}

interface RecentSwap {
  from: string;
  to: string;
  toAmount: number;
  date: string;
  status: string;
}

// ── Static data ────────────────────────────────────────────────────
const recentSwaps: RecentSwap[] = [
  { from: "BTC", to: "PLUTO", toAmount: 2300, date: "Yesterday 09:15", status: "confirmed" },
  { from: "ETH", to: "PLUTO", toAmount: 800,  date: "3 days ago",      status: "confirmed" },
];

// ── Component ──────────────────────────────────────────────────────
export default function SwapPage() {
  const { showToast } = useToast();

  const [fromCoin, setFromCoin] = useState<Coin>(coins[1]); // BTC
  const [toCoin,   setToCoin]   = useState<Coin>(coins[0]); // PLUTO
  const [fromAmt,  setFromAmt]  = useState<string>("");
  const [slippage, setSlippage] = useState<string>("0.5%");
  const [picking,  setPicking]  = useState<"from" | "to" | null>(null);
  const [loading,  setLoading]  = useState<boolean>(false);

  const rate  = swapRates[fromCoin.symbol]?.[toCoin.symbol] ?? 1;
  const toAmt = fromAmt ? (parseFloat(fromAmt) * rate).toFixed(4) : "";

  // ── Handlers ────────────────────────────────────────────────────
  const flip = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setFromAmt("");
  };

  const selectCoin = (coin: Coin) => {
    if (picking === "from") setFromCoin(coin);
    else setToCoin(coin);
    setPicking(null);
  };

  const handleSwap = async () => {
    if (!fromAmt || parseFloat(fromAmt) <= 0) {
      showToast("Please enter an amount", "error");
      return;
    }
    setLoading(true);
    await new Promise<void>((r) => setTimeout(r, 1200));
    setLoading(false);
    showToast(
      `Swap confirmed! +${parseFloat(toAmt).toLocaleString()} ${toCoin.symbol} received 🔄`,
      "success"
    );
    setFromAmt("");
  };

  // ── Swap details rows ────────────────────────────────────────────
  const swapDetails: [string, string][] = [
    ["Rate",               `1 ${fromCoin.symbol} = ${rate.toLocaleString()} ${toCoin.symbol}`],
    ["Price impact",       "< 0.01%"],
    ["Protocol fee",       "0.3%"],
    ["Slippage tolerance", slippage],
    ["Estimated gas",      "~$2.80"],
  ];

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[22px] font-black mb-1">Swap Tokens</h1>
        <p className="text-sm text-white/45">Exchange tokens instantly at the best rates.</p>
      </div>

      <div className="max-w-[460px]">
        <div className="card space-y-2">

          {/* ── FROM ──────────────────────────────────────────────── */}
          <div className="bg-[#1a1a24] border border-white/8 rounded-2xl p-4 focus-within:border-[#FF7900]/40 transition-colors">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">
              You Pay
            </p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="0.0"
                value={fromAmt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromAmt(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-3xl font-black placeholder-white/15 text-white"
              />
              <button
                onClick={() => setPicking("from")}
                className="flex items-center gap-2 bg-[#22222e] border border-white/10 rounded-xl px-4 py-2.5 font-bold text-sm hover:border-[#FF7900]/35 transition-colors flex-shrink-0"
              >
                <span className="text-xl">{fromCoin.icon}</span>
                {fromCoin.symbol}
                <span className="text-white/40">▾</span>
              </button>
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/40">
              <span>
                Balance:{" "}
                <strong className="text-white">
                  {fromCoin.balance.toLocaleString()} {fromCoin.symbol}
                </strong>
              </span>
              <button
                onClick={() => setFromAmt(String(fromCoin.balance))}
                className="text-[#FF7900] font-bold hover:underline"
              >
                MAX
              </button>
            </div>
          </div>

          {/* ── Flip ──────────────────────────────────────────────── */}
          <div className="flex justify-center">
            <button
              onClick={flip}
              className="w-10 h-10 rounded-full bg-[#1a1a24] border-2 border-white/8 flex items-center justify-center text-lg hover:border-[#FF7900]/40 hover:rotate-180 transition-all duration-300"
            >
              ⇅
            </button>
          </div>

          {/* ── TO ────────────────────────────────────────────────── */}
          <div className="bg-[#1a1a24] border border-white/8 rounded-2xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">
              You Receive
            </p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="0.0"
                value={toAmt}
                readOnly
                className="flex-1 bg-transparent border-none outline-none text-3xl font-black text-white/50 placeholder-white/15"
              />
              <button
                onClick={() => setPicking("to")}
                className="flex items-center gap-2 bg-[#22222e] border border-white/10 rounded-xl px-4 py-2.5 font-bold text-sm hover:border-[#FF7900]/35 transition-colors flex-shrink-0"
              >
                <span className="text-xl">{toCoin.icon}</span>
                {toCoin.symbol}
                <span className="text-white/40">▾</span>
              </button>
            </div>
            <p className="text-xs text-white/40 mt-2">
              Balance:{" "}
              <strong className="text-white">
                {toCoin.balance.toLocaleString()} {toCoin.symbol}
              </strong>
            </p>
          </div>

          {/* ── Swap details ──────────────────────────────────────── */}
          <div className="bg-[#1a1a24] rounded-xl p-4 space-y-2">
            {swapDetails.map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-white/45">{k}</span>
                <span
                  className={`font-semibold ${
                    k === "Price impact" ? "text-[#00d4aa]" : ""
                  }`}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* ── Slippage ──────────────────────────────────────────── */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40 font-semibold">Slippage Tolerance</span>
            <div className="flex gap-1.5">
              {(["0.1%", "0.5%", "1%"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSlippage(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                    slippage === s
                      ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                      : "bg-[#1a1a24] border-white/8 text-white/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ── Swap button ───────────────────────────────────────── */}
          <button
            className="btn-primary"
            onClick={handleSwap}
            disabled={loading}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              "Swap Now →"
            )}
          </button>
        </div>

        {/* ── Recent swaps ────────────────────────────────────────── */}
        <div className="card mt-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
            Recent Swaps
          </p>
          <div className="divide-y divide-white/8">
            {recentSwaps.map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF7900]/10 flex items-center justify-center text-base flex-shrink-0">
                  🔄
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">
                    {s.from} → {s.to}
                  </p>
                  <p className="text-xs text-white/40">{s.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#00d4aa]">
                    +{s.toAmount.toLocaleString()} {s.to}
                  </p>
                  <Badge status={s.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Coin picker modal ─────────────────────────────────────── */}
      {picking && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setPicking(null)}
        >
          <div
            className="bg-[#111118] border border-white/8 rounded-2xl p-6 w-full max-w-[380px] shadow-2xl"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black">Select Token</h3>
              <button
                onClick={() => setPicking(null)}
                className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center text-sm hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              className="field mb-4"
              placeholder="🔍 Search token..."
            />

            <div className="space-y-2">
              {coins.map((coin) => (
                <button
                  key={coin.symbol}
                  onClick={() => selectCoin(coin)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-[#1a1a24] border border-white/8 hover:border-[#FF7900]/35 transition-all text-left"
                >
                  <span className="text-2xl">{coin.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{coin.name}</p>
                    <p className="text-xs text-white/40">{coin.symbol}</p>
                  </div>
                  <p className="text-sm font-bold">{coin.balance.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}