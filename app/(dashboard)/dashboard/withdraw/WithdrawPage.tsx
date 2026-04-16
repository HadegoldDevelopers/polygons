"use client";

import { useEffect, useState } from "react";
import { PageHeading } from "@/components/ui";
import { useToast } from "@/context/ToastContext";
import { supabase } from "@/lib/supabase/supabaseClient";

type CoinMeta = {
  icon: string | null;
  color: string | null;
  networks: string[];
  withdraw_fee_token: number;
};

type Wallet = {
  id: string;
  symbol: string;
  amount: number;
  usd_value: number;
  price: number;
  change_pct: number;
  address: string;
  coin?: CoinMeta;
};

const steps = ["Details", "Confirm", "Done"] as const;

// Fallback metadata for POLYC (PolyCogni)
const POLYC_FALLBACK: CoinMeta = {
  icon: "🟧",
  color: "#FF7900",
  networks: ["PolyCogni Network"],
  withdraw_fee_token: 0,
};

export default function WithdrawPage() {
  const { showToast } = useToast();

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(0);
  const [token, setToken] = useState<Wallet | null>(null);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [submitting, setSubmitting] = useState(false);
 const feeToken = token?.coin?.withdraw_fee_token ?? 0;

const receiveAmount =
  amount ? Math.max(0, parseFloat(amount) - feeToken).toFixed(6) : "0";

  // Load wallets + coins metadata
  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        showToast("You must be logged in", "error");
        setLoading(false);
        return;
      }

      // 1. Load wallets
      const { data: walletRows } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id);

      // 2. Load coins metadata
      const { data: coinRows } = await supabase.from("coins").select("*");

      // 3. Merge metadata
      const merged = (walletRows || []).map((w) => {
        const meta = coinRows?.find((c) => c.symbol === w.symbol);

        return {
          ...w,
          coin: meta
            ? {
                icon: meta.icon,
                color: meta.color,
                networks: meta.networks,
                withdraw_fee_token: meta.withdraw_fee_token,
              }
            : // fallback for POLYC or any internal token
              POLYC_FALLBACK,
        };
      });

      setWallets(merged);

      if (merged.length > 0) {
        const first = merged[0];
        setToken(first);
        setAddress("");
        setNetwork(first.coin?.networks[0] || "");
      }

      setLoading(false);
    }

    load();
  }, [showToast]);

  const handleContinue = () => {
    if (!token) return;

    if (!address.trim()) {
      showToast("Please enter a recipient address", "error");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      showToast("Enter a valid amount", "error");
      return;
    }

    if (parseFloat(amount) > token.amount) {
      showToast(
        `Insufficient balance. You only have ${token.amount} ${token.symbol}`,
        "error"
      );
      return;
    }

    setStep(1);
  };

  const handleConfirm = async () => {
    if (!token) return;

    setSubmitting(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        showToast("You must be logged in", "error");
        setSubmitting(false);
        return;
      }

      const res = await fetch("/api/user/withdraw/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          token: token.symbol,
          amount,
          address,
          network,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Withdrawal failed", "error");
        setSubmitting(false);
        return;
      }

      showToast("Withdrawal submitted!", "success");
      setStep(2);
    } catch (err) {
      console.error(err);
      showToast("Unexpected error", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAmount("");
  };

  return (
  <div>
    <PageHeading
      title="Withdraw Funds"
      subtitle="Send your crypto to an external wallet."
    />

    {/* PAGE LOAD STATE */}
    {loading ? (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
          <p className="text-sm text-white/40">Loading tokens…</p>
        </div>
      </div>
    ) : (
      <>
        {/* WITHDRAWAL UI */}
        <div className="max-w-[520px]">
          {/* Step indicator */}
          <div className="flex items-center mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                      i < step
                        ? "bg-[#FF7900] border-[#FF7900] text-black"
                        : i === step
                        ? "border-[#FF7900] text-[#FF7900]"
                        : "border-white/15 text-white/30"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <p
                    className={`text-[11px] mt-1 font-bold ${
                      i === step ? "text-[#FF7900]" : "text-white/30"
                    }`}
                  >
                    {s}
                  </p>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mb-5 transition-colors ${
                      i < step ? "bg-[#FF7900]" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 0 — Details */}
          {step === 0 && token && (
            <div className="card space-y-5">
              {/* Token select */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
                  Select Token
                </label>

                <div className="flex gap-2 flex-wrap">
                  {wallets.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        setToken(w);
                        setAddress("");
                        setNetwork(w.coin?.networks[0] || "");
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold border transition-all ${
                        token.symbol === w.symbol
                          ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                          : "bg-[#1a1a24] border-white/8"
                      }`}
                    >
                      {w.coin?.icon || "🪙"} {w.symbol}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-white/40 mt-2">
                  Available:{" "}
                  <strong className="text-white">
                    {token.amount} {token.symbol}
                  </strong>
                </p>
              </div>

              {/* Address */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                  Recipient Address
                </label>
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
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                  Amount ({token.symbol})
                </label>

                <div className="relative">
                  <input
                    type="number"
                    className="field pr-16"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <button
                    onClick={() => setAmount(token.amount.toString())}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#FF7900] hover:underline"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Network */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                  Network
                </label>
                <select
                  className="field cursor-pointer"
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  {token.coin?.networks.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Fee summary */}
              <div className="bg-[#1a1a24] rounded-xl p-4 space-y-2">
                {[
                  ["Network fee", `${feeToken} ${token.symbol}`],
                  ["You will receive", `${receiveAmount} ${token.symbol}`],
                  ["Processing time", "~10 minutes"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-white/45">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>

              <button className="btn-primary" onClick={handleContinue}>
                Continue →
              </button>
            </div>
          )}

          {/* Step 1 — Confirm */}
          {step === 1 && token && (
            <div className="card space-y-5">
              <div className="text-center mb-2">
                <div className="text-4xl mb-3">⬆️</div>
                <h3 className="text-xl font-black mb-1">Confirm Withdrawal</h3>
                <p className="text-sm text-white/40">
                  Please review the details before confirming
                </p>
              </div>

              <div className="bg-[#1a1a24] rounded-xl p-4 space-y-3">
                {[
                  ["Token", token.symbol],
                  ["Amount", `${amount} ${token.symbol}`],
                  ["To", address],
                  ["Network", network],
                  ["Network fee", `${feeToken} ${token.symbol}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-white/45">{k}</span>
                    <span className="font-semibold font-mono text-right max-w-[200px] break-all">
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-[#ff4d6a]/8 border border-[#ff4d6a]/20 rounded-xl p-4 text-sm text-[#ff4d6a]">
                ⚠️ This action cannot be undone. Make sure the address is correct.
              </div>

              <div className="flex gap-3">
                <button className="btn-ghost flex-1" onClick={() => setStep(0)}>
                  ← Back
                </button>
                <button
                  className="btn-primary flex-1"
                  onClick={handleConfirm}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Confirm Withdrawal"}
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Done */}
          {step === 2 && token && (
            <div className="card text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#00d4aa]/15 flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>
              <h3 className="text-xl font-black text-[#00d4aa]">
                Withdrawal Submitted!
              </h3>
              <p className="text-sm text-white/45">
                Your withdrawal of{" "}
                <strong className="text-white">
                  {amount} {token.symbol}
                </strong>{" "}
                is being processed. Expected arrival in ~10 minutes.
              </p>

              <div className="bg-[#1a1a24] rounded-xl p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/45">Status</span>
                  <span className="text-yellow-400 font-bold">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/45">Amount</span>
                  <span className="font-bold">
                    {receiveAmount} {token.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/45">Tx Hash</span>
                  <span className="font-mono text-[#FF7900] text-xs">
                    0xabc1...def2
                  </span>
                </div>
              </div>

              <button className="btn-primary" onClick={handleReset}>
                Make Another Withdrawal
              </button>
            </div>
          )}
        </div>
      </>
    )}
  </div>
);
}