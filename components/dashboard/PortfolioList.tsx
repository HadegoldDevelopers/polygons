// components/dashboard/PortfolioList.tsx
"use client";

interface Wallet {
  id:         string;
  symbol:     string;
  amount:     number;
  usd_value:  number;
  change_pct: number;
}

interface Coin {
  symbol: string;
  name:   string;
  icon:   string;
}

interface Props {
  wallets: Wallet[];
  coins:   Record<string, Coin>;
}

const coinConfig: Record<string, { icon: string; iconBg: string; iconColor: string }> = {
  PC:   { icon: "🪙", iconBg: "bg-[#2282fa]/15", iconColor: "text-[#2282fa]"  },
  BTC:  { icon: "₿",  iconBg: "bg-[#f7931a]/15", iconColor: "text-[#f7931a]"  },
  ETH:  { icon: "Ξ",  iconBg: "bg-[#627eea]/15", iconColor: "text-[#627eea]"  },
  USDT: { icon: "$",  iconBg: "bg-[#26a17b]/15", iconColor: "text-[#26a17b]"  },
  USD:  { icon: "$",  iconBg: "bg-[#26a17b]/15", iconColor: "text-[#26a17b]"  },
  BNB:  { icon: "🟡", iconBg: "bg-[#f3ba2f]/15", iconColor: "text-[#f3ba2f]"  },
  XRP:  { icon: "R",  iconBg: "bg-[#2382fa]/15", iconColor: "text-[#2382fa]"  },
};

export default function PortfolioList({ wallets, coins }: Props) {
  // Only show wallets with a balance
  const nonZero = wallets.filter((w) => (w.amount ?? 0) > 0);

  return (
    <div className="card">
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
        My Portfolio
      </p>

      {nonZero.length === 0 ? (
        <p className="text-sm text-white/30 text-center py-8">
          No balances yet. Make a deposit to get started.
        </p>
      ) : (
        <div className="divide-y divide-white/8">
          {nonZero.map((wallet) => {
            const cfg  = coinConfig[wallet.symbol] ?? { icon: "🪙", iconBg: "bg-white/10", iconColor: "text-white" };
            const isUp = (wallet.change_pct ?? 0) >= 0;

            return (
              <div key={wallet.id} className="flex items-center gap-3 py-3.5">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full ${cfg.iconBg} ${cfg.iconColor} flex items-center justify-center text-lg font-black flex-shrink-0`}>
                  {cfg.icon}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">
                    {coins[wallet.symbol]?.name ?? wallet.symbol}
                  </p>
                  <p className="text-xs text-white/40">{wallet.symbol}</p>
                </div>

                {/* Values */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold">
                    {(wallet.amount ?? 0).toLocaleString()} {wallet.symbol}
                  </p>
                  <p className="text-xs text-white/40">
                    ${(wallet.usd_value ?? 0).toLocaleString()}
                  </p>
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
  );
}
