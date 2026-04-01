// Shared mock data used across all dashboard pages

// -----------------------------
// User
// -----------------------------
export const user = {
  name: "John Doe",
  email: "demo@plutochain.io",
  initials: "JD",
  country: "Nigeria",
  phone: "+234 800 000 0000",
};

// -----------------------------
// Balances
// -----------------------------
export const balances = {
  totalUSD: 12847.23,
  pluto: { amount: 48290, usd: 9658, change: 4.46, price: 0.20 },
  btc:   { amount: 0.0421, usd: 2841, change: 2.1,  price: 67500 },
  eth:   { amount: 0.892,  usd: 3460, change: -1.3, price: 3880  },
  usdt:  { amount: 100,    usd: 100,  change: 0.0,  price: 1.00  },
};

// -----------------------------
// Staking
// -----------------------------
export const staking = {
  staked: 20000,
  earned: 1400,
  apy: 70,
  lockDays: 30,
  daysLeft: 18,
  progress: 40,
};

// -----------------------------
// Transaction Types
// -----------------------------
export type TxType = "Deposit" | "Withdraw" | "Swap" | "Staking";

export interface Transaction {
  id: number;
  type: TxType;
  coin: string;
  amount: number;
  usd: number;
  from: string;
  hash: string;
  date: string;
  status: string;
  dir: "in" | "out";
}

// -----------------------------
// Transactions (Typed)
// -----------------------------
export const transactions: Transaction[] = [
  { id: 1, type: "Deposit",  coin: "PLUTO", amount: 5000,   usd: 1000, from: "0x742d...B12C",  hash: "0xabc1...def2", date: "2024-03-15 14:32", status: "confirmed", dir: "in" },
  { id: 2, type: "Swap",     coin: "PLUTO", amount: 2300,   usd: 460,  from: "BTC → PLUTO",    hash: "0xdef3...abc4", date: "2024-03-14 09:15", status: "confirmed", dir: "in" },
  { id: 3, type: "Withdraw", coin: "PLUTO", amount: -500,   usd: 100,  from: "0xA3f8...D90E",   hash: "0xfed5...cba6", date: "2024-03-13 17:48", status: "pending",   dir: "out" },
  { id: 4, type: "Staking",  coin: "PLUTO", amount: 1400,   usd: 280,  from: "Staking reward", hash: "0x123a...456b", date: "2024-03-12 00:00", status: "confirmed", dir: "in" },
  { id: 5, type: "Deposit",  coin: "PLUTO", amount: 10000,  usd: 2000, from: "0xB9c2...E11F",   hash: "0x789c...012d", date: "2024-03-10 11:05", status: "confirmed", dir: "in" },
  { id: 6, type: "Swap",     coin: "PLUTO", amount: 800,    usd: 160,  from: "ETH → PLUTO",    hash: "0xaaa1...bbb2", date: "2024-03-08 16:22", status: "confirmed", dir: "in" },
  { id: 7, type: "Withdraw", coin: "BTC",   amount: -0.002, usd: 135,  from: "0xC5d9...F22A",   hash: "0xccc3...ddd4", date: "2024-03-06 10:11", status: "failed",    dir: "out" },
];

// -----------------------------
// Coins
// -----------------------------
export const coins = [
  { symbol: "PLUTO", name: "PlutoChain", icon: "🪙", color: "#FF7900", balance: 48290, price: 0.20 },
  { symbol: "BTC",   name: "Bitcoin",    icon: "₿",  color: "#f7931a", balance: 0.0421, price: 67500 },
  { symbol: "ETH",   name: "Ethereum",   icon: "Ξ",  color: "#627eea", balance: 0.892,  price: 3880  },
  { symbol: "USDT",  name: "Tether",     icon: "$",  color: "#26a17b", balance: 100,    price: 1.00  },
];

// -----------------------------
// Swap Rates
// -----------------------------
export const swapRates = {
  BTC:  { PLUTO: 10000, ETH: 17.2, USDT: 67500 },
  ETH:  { PLUTO: 582,   BTC: 0.058, USDT: 3880 },
  PLUTO:{ BTC: 0.0001,  ETH: 0.00172, USDT: 0.20 },
  USDT: { PLUTO: 5,     BTC: 0.0000148, ETH: 0.000258 },
};
