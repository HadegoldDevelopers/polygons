"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui";
import { useToast } from "@/context/ToastContext";
import { supabase } from "@/lib/supabase/supabaseClient";

// ── Types ──────────────────────────────────────────────────────────
type DbCoin = {
  symbol: string;
  name: string;
  icon: string | null;
  color: string | null;
  networks: string[];
  price: number | null;
};

type SwapCoin = DbCoin & {
  balance: number;
};

type RecentSwap = {
  from: string;
  to: string;
  toAmount: number;
  date: string;
  status: string;
};

// ── Component ──────────────────────────────────────────────────────
export default function SwapPage() {
  const { showToast } = useToast();

  // Coins + balances
  const [coins, setCoins] = useState<SwapCoin[]>([]);
  const [loadingCoins, setLoadingCoins] = useState(true);

  // Swap rates
  const [swapRates, setSwapRates] = useState<
    Record<string, Record<string, number>>
  >({});

  // Recent swaps
  const [recentSwaps, setRecentSwaps] = useState<RecentSwap[]>([]);

  // UI state
  const [fromCoin, setFromCoin] = useState<SwapCoin | null>(null);
  const [toCoin, setToCoin] = useState<SwapCoin | null>(null);
  const [fromAmt, setFromAmt] = useState("");
  const [slippage, setSlippage] = useState("0.5%");
  const [picking, setPicking] = useState<"from" | "to" | null>(null);
  const [loading, setLoading] = useState(false);
  const [historyPage, setHistoryPage] = useState(0);


  // ────────────────────────────────────────────────────────────────
  // Loaders (must be top-level)
  // ────────────────────────────────────────────────────────────────

  const loadCoins = async () => {
  setLoadingCoins(true);
  const supabaseClient = supabase;

  // 1. Fetch user wallet balances
  const { data: walletRows } = await supabaseClient
    .from("wallets")
    .select("symbol, amount");

  // If user has no wallets, stop early
  if (!walletRows || walletRows.length === 0) {
    setCoins([]);
    setLoadingCoins(false);
    return;
  }

  // 2. Fetch metadata for ONLY the coins the user owns
  const symbols = walletRows.map((w) => w.symbol);

  const { data: coinRows } = await supabaseClient
    .from("coins")
    .select("symbol, name, icon, color, networks, price")
    .in("symbol", symbols);

  // 3. Merge metadata + balances
  const merged: SwapCoin[] = walletRows.map((w) => {
    const meta = coinRows?.find((c) => c.symbol === w.symbol);

    return {
      symbol: w.symbol,
      name: meta?.name ?? w.symbol,
      icon: meta?.icon ?? "❓",
      color: meta?.color ?? "#999",
      networks: meta?.networks ?? [],
      price: meta?.price ?? null,
      balance: w.amount,
    };
  });

  setCoins(merged);

  // Default selections
  if (merged.length >= 2) {
    setFromCoin(merged[0]);
    setToCoin(merged[1]);
  }

  setLoadingCoins(false);
};

  const loadRates = async () => {
  const supabaseClient = supabase;

  const { data, error } = await supabaseClient
    .from("swap_rates")
    .select("from_coin, to_coin, rate");

  if (error) {
    console.error("swap_rates error:", error);
    return;
  }

  const map: Record<string, Record<string, number>> = {};

  (data || []).forEach((row) => {
    const from = row.from_coin.toUpperCase();
    const to = row.to_coin.toUpperCase();

    if (!map[from]) map[from] = {};
    map[from][to] = row.rate;
  });

  setSwapRates(map);
};

  const loadHistory = async (page = 0) => {
  const supabaseClient = supabase;

  const { data } = await supabaseClient
    .from("swap_history")
    .select("from_symbol, to_symbol, to_amount, created_at, status")
    .order("created_at", { ascending: false })
    .range(page * 10, page * 10 + 9);

  const formatted = (data || []).map((row) => ({
    from: row.from_symbol,
    to: row.to_symbol,
    toAmount: Number(row.to_amount),
    date: new Date(row.created_at).toLocaleString(),
    status: row.status,
  }));

  if (page === 0) {
    setRecentSwaps(formatted);
  } else {
    setRecentSwaps((prev) => [...prev, ...formatted]);
  }
};


  // ────────────────────────────────────────────────────────────────
  // Effects
  // ────────────────────────────────────────────────────────────────
  useEffect(() => { loadCoins(); }, []);
  useEffect(() => { loadRates(); }, []);
  useEffect(() => { loadHistory(); }, []);

  // ────────────────────────────────────────────────────────────────
  // Derived values
  // ────────────────────────────────────────────────────────────────
  const rate =
  fromCoin && toCoin
    ? swapRates[fromCoin.symbol.toUpperCase()]?.[toCoin.symbol.toUpperCase()] ?? 0
    : 0;

  const toAmt =
    fromAmt && rate
      ? (parseFloat(fromAmt) * rate).toFixed(6)
      : "";

  // ────────────────────────────────────────────────────────────────
  // Swap handler
  // ────────────────────────────────────────────────────────────────
  const handleSwap = async () => {
    if (!fromCoin || !toCoin) {
      showToast("Select tokens first", "error");
      return;
    }

    if (!fromAmt || parseFloat(fromAmt) <= 0) {
      showToast("Enter an amount", "error");
      return;
    }

    if (parseFloat(fromAmt) > fromCoin.balance) {
      showToast("Insufficient balance", "error");
      return;
    }

    if (!rate || rate <= 0) {
      showToast("Swap rate unavailable", "error");
      return;
    }

    setLoading(true);

    const from_amount = parseFloat(fromAmt);
    const to_amount = parseFloat(toAmt);

    const user = (await supabase.auth.getUser()).data.user;

    const res = await fetch("/api/swap", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.id,
        from_symbol: fromCoin.symbol,
        to_symbol: toCoin.symbol,
        from_amount,
        to_amount,
        rate,
      }),
    });

    const json = await res.json();

    setLoading(false);

    if (!res.ok) {
      showToast(json.error || "Swap failed", "error");
      return;
    }

    showToast(`Swap confirmed! +${to_amount} ${toCoin.symbol}`, "success");

    setFromAmt("");

    await loadCoins();
    await loadHistory();
  };

  // ────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── Page heading ─────────────────────────────────────────── */}
      <div className="mb-5">
        <h1 className="text-[20px] md:text-[22px] font-black mb-1">Swap Tokens</h1>
        <p className="text-sm text-white/45">Exchange tokens instantly at the best rates.</p>
      </div>

      {loadingCoins || !fromCoin || !toCoin ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <span className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
            <p className="text-sm text-white/40">Loading tokens…</p>
          </div>
        </div>
      ) : (
        /* Full width on mobile, max 460px on desktop */
        <div className="w-full max-w-[460px]">
          <div className="card space-y-3 p-4 md:p-6">

            {/* ── FROM ──────────────────────────────────────────── */}
            <div className="bg-[#1a1a24] border border-white/8 rounded-2xl p-4 focus-within:border-[#FF7900]/40 transition-colors">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">
                You Pay
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0.0"
                  value={fromAmt}
                  onChange={(e) => setFromAmt(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-2xl md:text-3xl font-black text-white min-w-0"
                />

                <button
                  onClick={() => setPicking("from")}
                  className="flex items-center gap-1.5 bg-[#22222e] border border-white/10 rounded-xl px-3 py-2.5 font-bold text-sm hover:border-[#FF7900]/35 transition-colors flex-shrink-0 active:scale-95"
                >
                  <span className="text-lg">{fromCoin.icon}</span>
                  <span>{fromCoin.symbol}</span>
                  <span className="text-white/40 text-xs">▾</span>
                </button>
              </div>

              <div className="flex justify-between mt-2.5 text-xs text-white/40">
                <span>
                  Balance:{" "}
                  <strong className="text-white">
                    {fromCoin.balance.toLocaleString()} {fromCoin.symbol}
                  </strong>
                </span>
                <button
                  onClick={() => setFromAmt(String(fromCoin.balance))}
                  className="text-[#FF7900] font-bold active:opacity-70"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* ── Flip button ────────────────────────────────────── */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  const old = fromCoin;
                  setFromCoin(toCoin);
                  setToCoin(old);
                  setFromAmt("");
                }}
                className="w-10 h-10 rounded-full bg-[#1a1a24] border-2 border-white/8 flex items-center justify-center text-lg hover:border-[#FF7900]/40 hover:rotate-180 transition-all duration-300 active:scale-90"
              >
                ⇅
              </button>
            </div>

            {/* ── TO ────────────────────────────────────────────── */}
            <div className="bg-[#1a1a24] border border-white/8 rounded-2xl p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">
                You Receive
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="0.0"
                  value={toAmt}
                  readOnly
                  className="flex-1 bg-transparent border-none outline-none text-2xl md:text-3xl font-black text-white/50 min-w-0"
                />

                <button
                  onClick={() => setPicking("to")}
                  className="flex items-center gap-1.5 bg-[#22222e] border border-white/10 rounded-xl px-3 py-2.5 font-bold text-sm hover:border-[#FF7900]/35 transition-colors flex-shrink-0 active:scale-95"
                >
                  <span className="text-lg">{toCoin.icon}</span>
                  <span>{toCoin.symbol}</span>
                  <span className="text-white/40 text-xs">▾</span>
                </button>
              </div>

              <p className="text-xs text-white/40 mt-2.5">
                Balance:{" "}
                <strong className="text-white">
                  {toCoin.balance.toLocaleString()} {toCoin.symbol}
                </strong>
              </p>
            </div>

            {/* ── Swap details ───────────────────────────────────── */}
            <div className="bg-[#1a1a24] rounded-xl p-3.5 space-y-2">
              {[
                ["Rate",               rate ? `1 ${fromCoin.symbol} = ${rate} ${toCoin.symbol}` : "No rate"],
                ["Price impact",       "< 0.01%"],
                ["Protocol fee",       "0.3%"],
                ["Slippage tolerance", slippage],
                ["Estimated gas",      "~$2.80"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-white/45">{k}</span>
                  <span className="font-semibold text-right ml-2">{v}</span>
                </div>
              ))}
            </div>

            {/* ── Slippage selector ──────────────────────────────── */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-white/40 font-semibold flex-shrink-0">
                Slippage
              </span>
              <div className="flex gap-1.5">
                {(["0.1%", "0.5%", "1%"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlippage(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all active:scale-95 ${
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

            {/* ── Swap button ────────────────────────────────────── */}
            <button
              className="btn-primary text-base py-4 active:scale-[0.98]"
              onClick={handleSwap}
              disabled={loading || !rate}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : !rate ? (
                "No rate available"
              ) : (
                "Swap Now →"
              )}
            </button>
          </div>

          {/* ── Recent swaps ─────────────────────────────────────── */}
          <div className="card mt-4 p-4 md:p-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
              Recent Swaps
            </p>

            <div className="divide-y divide-white/8">
              {recentSwaps.length === 0 && (
                <p className="text-xs text-white/40 py-4 text-center">No recent swaps</p>
              )}

              {recentSwaps.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF7900]/10 flex items-center justify-center text-base flex-shrink-0">
                    🔄
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{s.from} → {s.to}</p>
                    <p className="text-xs text-white/40">{s.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-[#00d4aa]">
                      +{s.toAmount.toLocaleString()} {s.to}
                    </p>
                    <Badge status={s.status as "confirmed" | "pending" | "failed"} />
                  </div>
                </div>
              ))}
            </div>

            {/* Load more */}
            <button
              onClick={() => {
                const next = historyPage + 1;
                setHistoryPage(next);
                loadHistory(next);
              }}
              className="mt-3 w-full py-2.5 text-sm font-bold bg-[#1a1a24] border border-white/10 rounded-xl hover:border-[#FF7900]/35 transition-colors active:scale-[0.98]"
            >
              Load More
            </button>
          </div>
        </div>
      )}

      {/* ── Coin picker modal ─────────────────────────────────────── */}
      {picking && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
          onClick={() => setPicking(null)}
        >
          {/*
            On mobile → slides up from bottom (sheet style)
            On desktop → centered modal
          */}
          <div
            className="bg-[#111118] border border-white/8 rounded-t-3xl sm:rounded-2xl p-5 w-full sm:max-w-[380px] sm:mx-4 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar — mobile only */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black">Select Token</h3>
              <button
                onClick={() => setPicking(null)}
                className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center text-sm hover:bg-white/10 active:scale-90"
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              className="field mb-4 text-sm"
              placeholder="🔍 Search token..."
            />

            {/* Coin list — scrollable */}
            <div className="space-y-2 overflow-y-auto flex-1">
              {coins.map((coin) => (
                <button
                  key={coin.symbol}
                  onClick={() => {
                    if (picking === "from") setFromCoin(coin);
                    else setToCoin(coin);
                    setPicking(null);
                  }}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-[#1a1a24] border border-white/8 hover:border-[#FF7900]/35 transition-all active:scale-[0.98] text-left"
                >
                  <span className="text-2xl flex-shrink-0">{coin.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{coin.name}</p>
                    <p className="text-xs text-white/40">{coin.symbol}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold">{coin.balance.toLocaleString()}</p>
                    <p className="text-xs text-white/40">{coin.symbol}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}