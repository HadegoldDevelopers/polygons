"use client";

import { useEffect, useState } from "react";
import { TableSkeleton } from "@/components/admin/ui/AdminUI";
import type { CoinMarket } from "@/lib/admin/types";
import { CoinMarketsHeader } from "../../../../components/admin/pages/coin-markets/CoinMarketsHeader";
import { CoinMarketsTable } from "../../../../components/admin/pages/coin-markets/CoinMarketsTable";
import { CoinMarketModal } from "../../../../components/admin/pages/coin-markets/CoinMarketModal";


export default function CoinMarketsPage() {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CoinMarket | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/coin-markets", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load coins");
      const data = await res.json();
      setCoins(data ?? []);
    } catch (err) {
      console.error("Failed to load coin markets", err);
      setCoins([]);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/coin-markets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) throw new Error("Failed to save coin");
      await load();
      setEditing(null);
    } catch (err) {
      console.error("Failed to save coin", err);
    } finally {
      setSaving(false);
    }
  };

  const setField = (key: keyof CoinMarket, val: string | number) =>
    setEditing(prev => (prev ? { ...prev, [key]: val } : prev));

  useEffect(() => {
    load();
  }, []);

  if (loading) return <TableSkeleton rows={6} cols={7} />;

  return (
    <div>
      <CoinMarketsHeader coinsCount={coins.length} onAdd={() =>
        setEditing({
          symbol: "",
          name: "",
          icon: "🪙",
          price: 0,
          change_24h: 0,
          change_7d: 0,
          market_cap: 0,
          volume_24h: 0,
          circulating_supply: 0,
          updated_at: new Date().toISOString(),
        })
      } />

      <CoinMarketsTable coins={coins} onEdit={coin => setEditing({ ...coin })} />

      <CoinMarketModal
        editing={editing}
        onClose={() => setEditing(null)}
        saving={saving}
        save={save}
        setField={setField}
      />
    </div>
  );
}
