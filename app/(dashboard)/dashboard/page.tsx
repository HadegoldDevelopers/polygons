"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatCard, Badge, PageHeading } from "@/components/ui";
import { supabase } from "@/lib/supabase/supabaseClient";

// ── Types ──────────────────────────────────────────────────────────
interface Profile {
  id: string;
  name: string;
  email: string;
}

interface Wallet {
  id: string;
  symbol: string;
  amount: number;
  usd_value: number;
  change_pct: number;
  address: string;
}

interface Transaction {
  id: string;
  type: "Deposit" | "Withdraw" | "Swap" | "Staking";
  coin: string;
  amount: number;
  status: "confirmed" | "pending" | "failed";
  direction: "in" | "out";
  created_at: string;
}

interface StakingPosition {
  id: string;
  amount: number;
  earned: number;
  apy: number;
  days_left: number;
  status: string;
  staking_plans?: {
    name: string;
    apr: number;
    duration_days: number;
  };
}

interface Coin {
  symbol: string;
  name: string;
  icon: string;
  color: string;
}

// ── Helpers ────────────────────────────────────────────────────────
const txIcons: Record<string, string> = {
  Deposit: "⬇", Withdraw: "⬆", Swap: "🔄", Staking: "🪙",
};
const txBg: Record<string, string> = {
  Deposit: "bg-[#00d4aa]/10", Withdraw: "bg-[#ff4d6a]/10",
  Swap: "bg-[#FF7900]/10",    Staking:  "bg-[#FF7900]/10",
};
const coinConfig: Record<string, { icon: string; iconBg: string; iconColor: string }> = {
  PC: { icon: "🪙", iconBg: "bg-[#FF7900]/15", iconColor: "text-[#FF7900]" },
  BTC:   { icon: "₿",  iconBg: "bg-[#f7931a]/15", iconColor: "text-[#f7931a]" },
  ETH:   { icon: "Ξ",  iconBg: "bg-[#627eea]/15", iconColor: "text-[#627eea]" },
  USDT:  { icon: "$",  iconBg: "bg-[#26a17b]/15", iconColor: "text-[#26a17b]" },
};

// ── Component ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const [profile,  setProfile]  = useState<Profile | null>(null);
  const [wallets,  setWallets]  = useState<Wallet[]>([]);
  const [coins,    setCoins]    = useState<Record<string, Coin>>({});
  const [recentTx, setRecentTx] = useState<Transaction[]>([]);
  const [stakes,   setStakes]   = useState<StakingPosition[]>([]);
  const [loading,  setLoading]  = useState(true);

  // ── Fetch all data in parallel ───────────────────────────────────
  useEffect(() => {
    const fetchAll = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, walletsRes, coinsRes, txRes, stakesRes] = await Promise.all([

        supabase.from("profiles").select("*").eq("id", user.id).single(),

        supabase.from("wallets").select("*").eq("user_id", user.id),

        supabase.from("coins").select("*"),

        supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3),

        // Fetch ALL active stakes, join plan name/apr from staking_plans
        supabase
          .from("staking_positions")
          .select("*, staking_plans(name, apr, duration_days)")
          .eq("user_id", user.id)
          .eq("status", "active")
          .order("created_at", { ascending: false }),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (walletsRes.data) setWallets(walletsRes.data);
      if (txRes.data)      setRecentTx(txRes.data);
      if (stakesRes.data)  setStakes(stakesRes.data);

      if (coinsRes.data) {
        const map: Record<string, Coin> = {};
        coinsRes.data.forEach((c: Coin) => { map[c.symbol] = c; });
        setCoins(map);
      }

      setLoading(false);
    };

    fetchAll();
  }, []);

  // ── Derived values ───────────────────────────────────────────────
  const totalUSD         = wallets.reduce((s, w) => s + (w.usd_value ?? 0), 0);
  const polycWallet      = wallets.find((w) => w.symbol === "PC");
  const pendingCount     = recentTx.filter((t) => t.status === "pending").length;

  // Aggregate ALL stakes
  const totalStaked      = stakes.reduce((s, p) => s + (p.amount  ?? 0), 0);
  const totalEarned      = stakes.reduce((s, p) => s + (p.earned  ?? 0), 0);
  const avgApy           = stakes.length > 0
    ? Math.round(stakes.reduce((s, p) => s + (p.apy ?? 0), 0) / stakes.length)
    : 0;
  const activeStakeCount = stakes.length;

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = profile?.name?.split(" ")[0] ?? "there";

  // ── Loading skeleton ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-64 bg-white/8 rounded-lg" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-white/8 rounded-2xl" />)}
        </div>
        <div className="h-48 bg-white/8 rounded-2xl" />
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">
          <div className="h-64 bg-white/8 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-40 bg-white/8 rounded-2xl" />
            <div className="h-40 bg-white/8 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div>
      <PageHeading
        title={`${greeting}, ${firstName} 👋`}
        subtitle="Here's what's happening with your portfolio today."
      />

      {/* ── Stats ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon="💰"
          value={`$${totalUSD.toLocaleString("en", { maximumFractionDigits: 2 })}`}
          label="Total Balance (USD)"
          change="Live"
          changeDir="up"
        />
        <StatCard
          icon="🪙"
          value={(polycWallet?.amount ?? 0).toLocaleString()}
          label="POLYCOGNI CAPITAL Holdings"
          change={`${polycWallet?.change_pct ?? 0}% today`}
          changeDir={(polycWallet?.change_pct ?? 0) >= 0 ? "up" : "down"}
        />
        <StatCard
          icon="🔒"
          value={`$${totalStaked.toLocaleString()}`}
          label="Total Staked"
          change={`${activeStakeCount} active plan${activeStakeCount !== 1 ? "s" : ""}`}
          changeDir="up"
        />
        <StatCard
          icon="🔄"
          value={recentTx.length.toString()}
          label="Recent Transactions"
          change={pendingCount > 0 ? `${pendingCount} pending` : "All confirmed"}
          changeDir={pendingCount > 0 ? "down" : "up"}
        />
      </div>

      {/* ── Balance hero ────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl border border-[#FF7900]/35 p-7 mb-6"
        style={{ background: "linear-gradient(135deg,#1a0f00 0%,#111118 60%,#0a0a0f 100%)" }}
      >
        <div className="absolute top-[-60px] right-[-60px] w-52 h-52 rounded-full bg-[#FF7900]/10 blur-3xl pointer-events-none" />
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
          POLYCOGNI CAPITAL Token Balance
        </p>
        <div className="text-4xl font-black mb-1" style={{ letterSpacing: "-1.5px" }}>
          {(polycWallet?.amount ?? 0).toLocaleString()}{" "}
          <span className="text-[#FF7900] text-2xl">POLYCOGNI CAPITAL</span>
        </div>
        <p className="text-sm text-white/40 mb-6">
          ≈ ${(polycWallet?.usd_value ?? 0).toLocaleString()} USD ·{" "}
          <span className={(polycWallet?.change_pct ?? 0) >= 0 ? "text-[#00d4aa]" : "text-[#ff4d6a]"}>
            {(polycWallet?.change_pct ?? 0) >= 0 ? "▲" : "▼"}{" "}
            {Math.abs(polycWallet?.change_pct ?? 0)}% today
          </span>
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "⬇ Deposit",  href: "/dashboard/deposit",  primary: true  },
            { label: "⬆ Withdraw", href: "/dashboard/withdraw", primary: false },
            { label: "🔄 Swap",    href: "/dashboard/swap",     primary: false },
          ].map((btn) => (
            <Link
              key={btn.label}
              href={btn.href}
              className={`flex-1 min-w-[100px] py-3 rounded-xl text-sm font-bold text-center transition-all ${
                btn.primary
                  ? "bg-[#FF7900] text-black hover:bg-[#ff8c1a]"
                  : "bg-[#1a1a24] border border-white/8 hover:border-[#FF7900]/35"
              }`}
            >
              {btn.label}
            </Link>
          ))}
          <button
            onClick={() => navigator.clipboard?.writeText(polycWallet?.address ?? "")}
            className="flex-1 min-w-[100px] py-3 rounded-xl text-sm font-bold bg-[#1a1a24] border border-white/8 hover:border-[#FF7900]/35 transition-all"
          >
            📋 Copy Address
          </button>
        </div>
      </div>

      {/* ── Quick actions ────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { icon: "⬇️", label: "Deposit",  href: "/dashboard/deposit"  },
          { icon: "⬆️", label: "Withdraw", href: "/dashboard/withdraw" },
          { icon: "🔄", label: "Swap",     href: "/dashboard/swap"     },
          { icon: "🔒", label: "Stake",    href: "/dashboard/staking"  },
        ].map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="bg-[#111118] border border-white/8 rounded-xl py-4 text-center hover:border-[#FF7900]/35 hover:bg-[#FF7900]/8 transition-all"
          >
            <div className="text-2xl mb-1.5">{a.icon}</div>
            <div className="text-[11px] font-bold text-white/45">{a.label}</div>
          </Link>
        ))}
      </div>

      {/* ── Portfolio + Right col ────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">

        {/* Portfolio */}
        <div className="card">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
            My Portfolio
          </p>
          {wallets.length === 0 ? (
            <p className="text-sm text-white/30 text-center py-8">
              No wallets found. Make a deposit to get started.
            </p>
          ) : (
            <div className="divide-y divide-white/8">
              {wallets.map((wallet) => {
                const cfg  = coinConfig[wallet.symbol] ?? { icon: "🪙", iconBg: "bg-white/10", iconColor: "text-white" };
                const isUp = (wallet.change_pct ?? 0) >= 0;
                return (
                  <div key={wallet.id} className="flex items-center gap-3 py-3.5">
                    <div className={`w-10 h-10 rounded-full ${cfg.iconBg} ${cfg.iconColor} flex items-center justify-center text-lg font-black flex-shrink-0`}>
                      {cfg.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{coins[wallet.symbol]?.name ?? wallet.symbol}</p>
                      <p className="text-xs text-white/40">{wallet.symbol}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{(wallet.amount ?? 0).toLocaleString()} {wallet.symbol}</p>
                      <p className="text-xs text-white/40">${(wallet.usd_value ?? 0).toLocaleString()}</p>
                      <p className={`text-[11px] font-bold ${isUp ? "text-[#00d4aa]" : "text-[#ff4d6a]"}`}>
                        {isUp ? "▲" : "▼"} {Math.abs(wallet.change_pct ?? 0)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* ── Staking summary ──────────────────────────────────── */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Staking Summary
              </p>
              {activeStakeCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF7900]/15 text-[#FF7900]">
                  {activeStakeCount} active
                </span>
              )}
            </div>

            {stakes.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-white/30 mb-3">No active staking plans</p>
                <Link href="/dashboard/staking">
                  <button className="btn-ghost text-xs px-3 py-1.5 rounded-lg">
                    Start Staking →
                  </button>
                </Link>
              </div>
            ) : (
              <>
                {/* Totals across all stakes */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-[#1a1a24] rounded-xl p-2.5 text-center">
                    <p className="text-[10px] text-white/40 font-bold uppercase mb-1">Staked</p>
                    <p className="text-sm font-black">${totalStaked.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#1a1a24] rounded-xl p-2.5 text-center">
                    <p className="text-[10px] text-white/40 font-bold uppercase mb-1">Earned</p>
                    <p className="text-sm font-black text-[#00d4aa]">+${totalEarned.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#1a1a24] rounded-xl p-2.5 text-center">
                    <p className="text-[10px] text-white/40 font-bold uppercase mb-1">Avg APY</p>
                    <p className="text-sm font-black text-[#FF7900]">{avgApy}%</p>
                  </div>
                </div>

                {/* Preview first 2 stakes */}
                <div className="space-y-2 mb-4">
                  {stakes.slice(0, 2).map((stake) => (
                    <div
                      key={stake.id}
                      className="flex items-center justify-between bg-[#1a1a24] rounded-xl px-3 py-2.5"
                    >
                      <div>
                        <p className="text-xs font-bold">
                          {stake.staking_plans?.name ?? "Staking Plan"}
                        </p>
                        <p className="text-[10px] text-white/40">
                          {stake.days_left}d left · {stake.staking_plans?.apr ?? stake.apy}% APY
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold">${(stake.amount ?? 0).toLocaleString()}</p>
                        <p className="text-[10px] text-[#00d4aa] font-bold">
                          +${(stake.earned ?? 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  {stakes.length > 2 && (
                    <p className="text-[11px] text-white/30 text-center py-1">
                      +{stakes.length - 2} more active plan{stakes.length - 2 !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                {/* Manage all stakes */}
                <Link href="/dashboard/staking">
                  <button className="btn-ghost w-full text-xs py-2.5 rounded-lg">
                    Manage All Stakes →
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Recent activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Recent Activity
              </p>
              <Link href="/dashboard/transactions" className="text-xs text-[#FF7900] font-bold hover:underline">
                View all →
              </Link>
            </div>

            {recentTx.length === 0 ? (
              <p className="text-sm text-white/30 text-center py-6">No transactions yet</p>
            ) : (
              <div className="divide-y divide-white/8">
                {recentTx.map((tx) => (
                  <div key={tx.id} className="flex items-center gap-3 py-3">
                    <div className={`w-9 h-9 rounded-xl ${txBg[tx.type] ?? "bg-white/10"} flex items-center justify-center text-base flex-shrink-0`}>
                      {txIcons[tx.type] ?? "•"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold">{tx.type}</p>
                      <p className="text-xs text-white/40">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${tx.direction === "in" ? "text-[#00d4aa]" : "text-[#ff4d6a]"}`}>
                        {tx.direction === "in" ? "+" : "-"}{Math.abs(tx.amount).toLocaleString()} {tx.coin}
                      </p>
                      <Badge status={tx.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}