"use client";

import { useEffect, useState } from "react";
import { PageHeading, Badge } from "@/components/ui";
import { useToast } from "@/context/ToastContext";
import { supabase } from "@/lib/supabaseClient";

export default function DepositPage() {
  const { showToast } = useToast();

  const [coins, setCoins] = useState<any[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  const [depositData, setDepositData] = useState<any>(null);
  const [recentDeposits, setRecentDeposits] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  const [user, setUser] = useState<any>(null);

  // Load user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  // Load coins from DB
  useEffect(() => {
    const loadCoins = async () => {
      const { data } = await supabase.from("coins").select("*");
      setCoins(data || []);
    };
    loadCoins();
  }, []);

  // Load recent deposits
  useEffect(() => {
    if (!user) return;

    const loadDeposits = async () => {
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .eq("type", "deposit")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentDeposits(data || []);
    };

    loadDeposits();
  }, [user]);

  // Generate deposit session
  const generateDeposit = async () => {
    if (!selectedCoin || !selectedNetwork) return;

    const res = await fetch("/api/deposit/create-session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    coin: selectedCoin.symbol,
    network: selectedNetwork, 
    user_id: user.id
  }),
});
    const data = await res.json();

    if (data.error) {
      showToast("Error generating deposit address", "error");
      return;
    }

    setDepositData(data);
    showToast("Deposit address generated!", "success");
  };

  const copyAddr = () => {
    if (!depositData?.address) return;
    navigator.clipboard.writeText(depositData.address);
    setCopied(true);
    showToast("Address copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const formatNetwork = (net: string) => {
    if (net.includes("trc20")) return "TRC‑20";
    if (net.includes("erc20")) return "ERC‑20";
    if (net.includes("bsc")) return "BEP‑20";
    if (net === "btc") return "Bitcoin (Native)";
    if (net === "eth") return "Ethereum (Native)";
    return net.toUpperCase();
  };




  
  return (
    <div>
      <PageHeading
        title="Deposit Funds"
        subtitle="Select a coin and network to generate your secure deposit address."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className="card">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-5">
            Select Coin
          </p>

          {/* Coin selector */}
          <div className="flex gap-2 flex-wrap mb-5">
            {coins.map((coin) => (
              <button
                key={coin.symbol}
                onClick={() => {
                  setSelectedCoin(coin);
                  setSelectedNetwork(null);
                  setDepositData(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                  selectedCoin?.symbol === coin.symbol
                    ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                    : "bg-[#1a1a24] border-white/8 hover:border-[#FF7900]/25"
                }`}
              >
                {coin.symbol}
              </button>
            ))}
          </div>

          {/* Network selector */}
          {selectedCoin && (
            <>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
                Select Network
              </p>

              <div className="flex gap-2 flex-wrap mb-6">
                {selectedCoin.networks.map((net: string) => (
                  <button
                    key={net}
                    onClick={() => {
                      setSelectedNetwork(net);
                      setDepositData(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      selectedNetwork === net
                        ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                        : "bg-[#1a1a24] border-white/8"
                    }`}
                  >
                    {selectedCoin.symbol} {formatNetwork(net)}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Generate button */}
          {selectedCoin && selectedNetwork && !depositData && (
            <button
              onClick={generateDeposit}
              className="w-full py-3 rounded-xl border font-bold text-sm bg-[#FF7900]/10 border-[#FF7900]/35 text-[#FF7900] hover:bg-[#FF7900]/20 transition-all"
            >
              Generate Deposit Address →
            </button>
          )}

          {/* QR + Address */}
          {depositData && (
            <>
              <div className="flex justify-center mb-4">
                <img
                  src={depositData.qr_code}
                  className="w-44 h-44 rounded-xl bg-white p-2"
                />
              </div>

              <p className="text-center text-xs text-white/40 mb-4">
                Scan QR or copy address below
              </p>

              <div className="bg-[#1a1a24] border border-white/8 rounded-xl p-4 font-mono text-xs break-all leading-relaxed mb-3">
                {depositData.address}
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
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-4">

          {/* Deposit Info */}
          {depositData && (
            <div className="card">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
                Deposit Information
              </p>

              {[
                ["Network", `${selectedCoin.symbol} ${formatNetwork(selectedNetwork!)}`],
                ["Minimum deposit", `${depositData.min_amount} ${selectedCoin.symbol}`],
                ["Confirmations required", depositData.confirmations],
                ["Estimated arrival", "~5 minutes"],
                ["Network fee", "Paid by sender"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between items-center py-2.5 border-b border-white/8 last:border-0 text-sm"
                >
                  <span className="text-white/45">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Important Notice */}
          {selectedCoin && selectedNetwork && (
            <div className="rounded-2xl border border-[#FF7900]/35 bg-[#FF7900]/6 p-5">
              <p className="text-sm font-bold text-[#FF7900] mb-3">⚠️ Important</p>
              <ul className="text-sm text-white/50 space-y-1.5 list-disc list-inside">
                <li>
                  Only send <strong className="text-white">{selectedCoin.symbol}</strong> on{" "}
                  <strong className="text-white">{formatNetwork(selectedNetwork)}</strong>
                </li>
                <li>Sending wrong tokens results in permanent loss</li>
                <li>Deposits below minimum will not be credited</li>
              </ul>
            </div>
          )}

          {/* Recent Deposits */}
          <div className="card">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
              Recent Deposits
            </p>

            <div className="divide-y divide-white/8">
              {recentDeposits.length === 0 && (
                <p className="text-white/40 text-sm py-4">No deposits yet</p>
              )}

              {recentDeposits.map((d, i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center text-base flex-shrink-0">
                    ⬇
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{d.coin} Deposit</p>
                    <p className="text-xs text-white/40 font-mono">Ref: {d.hash}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#00d4aa]">+{d.amount}</p>
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
