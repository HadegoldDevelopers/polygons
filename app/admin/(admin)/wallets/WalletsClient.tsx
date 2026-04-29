"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminTable, SearchBar, FilterChip, TableSkeleton, AdminModal } from "@/components/admin/ui/AdminUI";

// ── Types ──────────────────────────────────────────────────────────
interface Wallet {
  id:         string;
  user_id:    string;
  symbol:     string;
  amount:     number;
  usd_value:  number;
  price:      number;
  change_pct: number;
  address:    string;
  profiles?:  { name: string; email: string };
}

type EditAction = "set" | "add" | "subtract";

// ── Component ──────────────────────────────────────────────────────
export default function WalletsClient() {
  const [wallets,   setWallets]   = useState<Wallet[]>([]);
  const [filtered,  setFiltered]  = useState<Wallet[]>([]);
  const [search,    setSearch]    = useState("");
  const [coinFilter,setCoinFilter]= useState("all");
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);

  // Edit modal state
  const [editing,   setEditing]   = useState<Wallet | null>(null);
  const [action,    setAction]    = useState<EditAction>("add");
  const [editAmt,   setEditAmt]   = useState("");
  const [note,      setNote]      = useState("");
  const [result,    setResult]    = useState<string | null>(null);

  // ── Load wallets ─────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    const res  = await fetch("/api/admin/wallets");
    const data = await res.json();
    setWallets(data.wallets ?? []);
    setFiltered(data.wallets ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Filter + search ──────────────────────────────────────────────
  useEffect(() => {
    let result = [...wallets];

    if (coinFilter !== "all") {
      result = result.filter((w) => w.symbol === coinFilter);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((w) =>
        w.symbol?.toLowerCase().includes(q) ||
        w.profiles?.name?.toLowerCase().includes(q) ||
        w.profiles?.email?.toLowerCase().includes(q) ||
        w.address?.toLowerCase().includes(q)
      );
    }

    setFiltered(result);
  }, [search, coinFilter, wallets]);

  // ── Get unique coin symbols for filter chips ─────────────────────
  const coins = ["all", ...Array.from(new Set(wallets.map((w) => w.symbol))).sort()];

  // ── Stats ────────────────────────────────────────────────────────
  const totalUSD   = wallets.reduce((s, w) => s + (w.usd_value ?? 0), 0);
  const totalUsers = new Set(wallets.map((w) => w.user_id)).size;

  // ── Open edit modal ──────────────────────────────────────────────
  const openEdit = (wallet: Wallet) => {
    setEditing(wallet);
    setAction("add");
    setEditAmt("");
    setNote("");
    setResult(null);
  };

  // ── Submit wallet update ─────────────────────────────────────────
  const handleSave = async () => {
    if (!editing || !editAmt || Number(editAmt) < 0) return;
    setSaving(true);
    setResult(null);

    const res = await fetch("/api/admin/wallets", {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet_id: editing.id,
        action,
        amount:    Number(editAmt),
        note,
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setResult(`❌ ${data.error}`);
      return;
    }

    setResult(
      `✅ Done — ${editing.symbol} balance: ${data.old_amount} → ${data.new_amount}` +
      (data.diff !== 0 ? ` (${data.diff > 0 ? "+" : ""}${data.diff})` : "")
    );

    // Update local state immediately
    setWallets((prev) =>
      prev.map((w) =>
        w.id === editing.id ? { ...w, amount: data.new_amount } : w
      )
    );
  };

  // ── Loading ──────────────────────────────────────────────────────
  if (loading) return <TableSkeleton rows={8} cols={7} />;

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Wallets",    value: wallets.length.toString()                                   },
          { label: "Unique Users",     value: totalUsers.toString()                                       },
          { label: "Total USD Value",  value: `$${totalUSD.toLocaleString()}`,  green: true               },
        ].map((s) => (
          <div key={s.label} className="bg-[#111118] border border-white/8 rounded-2xl p-4">
            <p className={`text-xl font-black ${s.green ? "text-[#00d4aa]" : ""}`}>{s.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + refresh */}
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <SearchBar value={search} onChange={setSearch} placeholder="Search user, coin, address…" />
        <button
          onClick={load}
          className="px-4 py-2 rounded-xl bg-[#111118] border border-white/8 text-sm font-bold hover:border-[#FF7900]/35 transition-colors flex-shrink-0"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Coin filter chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {coins.map((c) => (
          <FilterChip
            key={c}
            label={c === "all" ? "All Coins" : c}
            active={coinFilter === c}
            onClick={() => setCoinFilter(c)}
          />
        ))}
      </div>

      {/* Table */}
      <AdminTable
        headers={["User", "Coin", "Amount", "USD Value", "Price", "Change", "Address", "Actions"]}
        isEmpty={filtered.length === 0}
        empty="No wallets found"
      >
        {filtered.map((w) => (
          <tr key={w.id} className="hover:bg-white/2 transition-colors">
            <td className="px-4 py-3.5">
              <p className="text-sm font-bold">{w.profiles?.name ?? "—"}</p>
              <p className="text-xs text-white/40">{w.profiles?.email ?? "—"}</p>
            </td>
            <td className="px-4 py-3.5">
              <span className="text-sm font-black">{w.symbol}</span>
            </td>
            <td className="px-4 py-3.5">
              <p className="text-sm font-bold">{(w.amount ?? 0).toLocaleString()}</p>
            </td>
            <td className="px-4 py-3.5 text-sm font-bold text-[#00d4aa]">
              ${(w.usd_value ?? 0).toLocaleString()}
            </td>
            <td className="px-4 py-3.5 text-sm">
              ${(w.price ?? 0).toLocaleString()}
            </td>
            <td className={`px-4 py-3.5 text-sm font-bold ${
              (w.change_pct ?? 0) >= 0 ? "text-[#00d4aa]" : "text-[#ff4d6a]"
            }`}>
              {(w.change_pct ?? 0) >= 0 ? "▲" : "▼"} {Math.abs(w.change_pct ?? 0)}%
            </td>
            <td className="px-4 py-3.5 text-xs font-mono text-white/40">
              {w.address?.slice(0, 14)}…
            </td>
            <td className="px-4 py-3.5">
              <button
                onClick={() => openEdit(w)}
                className="px-3 py-1.5 rounded-lg bg-[#FF7900]/10 text-[#FF7900] text-xs font-bold hover:bg-[#FF7900]/20 transition-colors whitespace-nowrap"
              >
                ✏ Edit
              </button>
            </td>
          </tr>
        ))}
      </AdminTable>

      {/* ── Edit Wallet Modal ──────────────────────────────────── */}
      <AdminModal
        open={!!editing}
        onClose={() => { setEditing(null); setResult(null); }}
        title={editing ? `Edit ${editing.symbol} Wallet` : "Edit Wallet"}
      >
        {editing && (
          <div className="space-y-4">
            {/* Wallet info */}
            <div className="bg-[#1a1a24] rounded-xl p-4 space-y-2">
              {[
                ["User",            editing.profiles?.name ?? "—"],
                ["Email",           editing.profiles?.email ?? "—"],
                ["Coin",            editing.symbol],
                ["Current Balance", `${editing.amount.toLocaleString()} ${editing.symbol}`],
                ["USD Value",       `$${(editing.usd_value ?? 0).toLocaleString()}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/45">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>

            {/* Action selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                Action
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: "add",      label: "➕ Add",      color: "text-[#00d4aa]"  },
                  { value: "subtract", label: "➖ Subtract", color: "text-[#ff4d6a]"  },
                  { value: "set",      label: "✏ Set",       color: "text-[#FF7900]"  },
                ] as { value: EditAction; label: string; color: string }[]).map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setAction(a.value)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      action === a.value
                        ? `bg-[#FF7900]/15 border-[#FF7900]/40 ${a.color}`
                        : "bg-[#1a1a24] border-white/8 text-white/50 hover:border-white/20"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount input */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                Amount ({editing.symbol})
              </label>
              <input
                type="number"
                className="field text-sm"
                placeholder={
                  action === "set"
                    ? `New balance (current: ${editing.amount})`
                    : action === "add"
                    ? "Amount to add"
                    : "Amount to subtract"
                }
                value={editAmt}
                min="0"
                onChange={(e) => setEditAmt(e.target.value)}
              />
              {/* Preview */}
              {editAmt && Number(editAmt) >= 0 && (
                <p className="text-xs text-white/40 mt-1.5">
                  Result:{" "}
                  <strong className="text-white">
                    {action === "set"
                      ? Number(editAmt).toLocaleString()
                      : action === "add"
                      ? (editing.amount + Number(editAmt)).toLocaleString()
                      : Math.max(0, editing.amount - Number(editAmt)).toLocaleString()
                    }{" "}{editing.symbol}
                  </strong>
                </p>
              )}
            </div>

            {/* Note */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                Admin Note <span className="normal-case font-normal text-white/25">(shown to user)</span>
              </label>
              <input
                type="text"
                className="field text-sm"
                placeholder="e.g. Manual adjustment, bonus credit…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {/* Result message */}
            {result && (
              <div className={`rounded-xl px-4 py-3 text-sm font-medium ${
                result.startsWith("✅")
                  ? "bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-[#00d4aa]"
                  : "bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 text-[#ff6b82]"
              }`}>
                {result}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => { setEditing(null); setResult(null); }}
                className="flex-1 py-3 rounded-xl border border-white/15 text-sm font-bold hover:bg-white/4"
              >
                {result?.startsWith("✅") ? "Close" : "Cancel"}
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editAmt || Number(editAmt) < 0}
                className="flex-1 py-3 rounded-xl bg-[#FF7900] text-black text-sm font-bold hover:bg-[#ff8c1a] disabled:opacity-50 transition-colors"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mx-auto block" />
                ) : (
                  "Apply Changes"
                )}
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}