import type { Metadata } from "next";
import WalletsClient from "./WalletsClient";

export const metadata: Metadata = {
  title: "Wallet Balances | PlutoChain Admin",
  description: "Manage and adjust user wallet balances",
};

export default function WalletsPage() {
  return (
    <div>
      {/* Page header — server rendered */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black mb-0.5">Wallet Balances</h1>
          <p className="text-sm text-white/40">
            View and manage all user wallet balances
          </p>
        </div>
      </div>

      {/* All interactive content — client component */}
      <WalletsClient />
    </div>
  );
}