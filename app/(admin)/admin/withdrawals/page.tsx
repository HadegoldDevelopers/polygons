"use client";
import { useEffect, useState } from "react";
import { supabaseService } from "@/lib/supabase/service";
import { AdminTable, SearchBar, FilterChip, StatusBadge, AdminModal, TableSkeleton } from "@/components/admin/ui/AdminUI";
import type { WithdrawalRequest } from "@/lib/admin/types";

export default function WithdrawalsPage() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [filtered, setFiltered] = useState<WithdrawalRequest[]>([]);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("pending");
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState<WithdrawalRequest | null>(null);
  const [txHash,   setTxHash]   = useState("");
  const [adminNote,setAdminNote]= useState("");
  const [acting,   setActing]   = useState(false);

  const load = async () => {
    setLoading(true);
    let query = supabaseService
      .from("withdrawal_requests")
      .select("*, profiles(name, email)")
      .order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    setRequests(data ?? []);
    setFiltered(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  useEffect(() => {
    if (!search) { setFiltered(requests); return; }
    const q = search.toLowerCase();
    setFiltered(requests.filter((r) =>
      (r.profiles as any)?.name?.toLowerCase().includes(q) ||
      (r.profiles as any)?.email?.toLowerCase().includes(q) ||
      r.coin?.toLowerCase().includes(q) ||
      r.to_address?.toLowerCase().includes(q)
    ));
  }, [search, requests]);

  const handleAction = async (action: "approved" | "rejected") => {
    if (!selected) return;
    setActing(true);

    await supabaseService
      .from("withdrawal_requests")
      .update({
        status:      action,
        tx_hash:     action === "approved" ? txHash : null,
        admin_note:  adminNote,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", selected.id);

    // If approved — deduct from wallet
    if (action === "approved") {
      const { data: wallet } = await supabaseService
        .from("wallets")
        .select("*")
        .eq("user_id", selected.user_id)
        .eq("symbol", selected.coin)
        .single();

      if (wallet) {
        await supabaseService
          .from("wallets")
          .update({ amount: Math.max(0, wallet.amount - selected.amount) })
          .eq("id", wallet.id);
      }

      // Log transaction
      await supabaseService.from("transactions").insert({
        user_id:   selected.user_id,
        type:      "Withdraw",
        coin:      selected.coin,
        amount:    selected.amount,
        usd:       selected.usd_value ?? 0,
        hash:      txHash || selected.id,
        status:    "confirmed",
        direction: "out",
        created_at: new Date().toISOString(),
      });

      // Notify user
      await supabaseService.from("notifications").insert({
        user_id: selected.user_id,
        text:    `✅ Withdrawal of ${selected.amount} ${selected.coin} approved!`,
        time:    new Date().toISOString(),
        read:    false,
      });
    } else {
      await supabaseService.from("notifications").insert({
        user_id: selected.user_id,
        text:    `❌ Withdrawal of ${selected.amount} ${selected.coin} was rejected. ${adminNote ? `Reason: ${adminNote}` : ""}`,
        time:    new Date().toISOString(),
        read:    false,
      });
    }

    setRequests((prev) => prev.map((r) => r.id === selected.id ? { ...r, status: action } : r));
    setSelected(null);
    setTxHash("");
    setAdminNote("");
    setActing(false);
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  if (loading) return <TableSkeleton rows={8} cols={7} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black mb-0.5">Withdrawal Requests</h1>
          <p className="text-sm text-white/40">
            {pendingCount > 0 && (
              <span className="text-[#ff4d6a] font-bold">{pendingCount} pending review · </span>
            )}
            {filtered.length} total
          </p>
        </div>
        <button onClick={load} className="px-4 py-2 rounded-xl bg-[#111118] border border-white/8 text-sm font-bold hover:border-[#FF7900]/35">
          🔄 Refresh
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search user, coin, address...">
        {["pending","approved","rejected","all"].map((f) => (
          <FilterChip key={f} label={f.charAt(0).toUpperCase()+f.slice(1)} active={filter===f} onClick={() => setFilter(f)} />
        ))}
      </SearchBar>

      <AdminTable
        headers={["User","Coin","Amount","USD","Address","Network","Status","Date","Actions"]}
        isEmpty={filtered.length === 0}
        empty="No withdrawal requests"
      >
        {filtered.map((req) => (
          <tr key={req.id} className="hover:bg-white/2 transition-colors">
            <td className="px-4 py-3.5">
              <p className="text-sm font-bold">{(req.profiles as any)?.name ?? "—"}</p>
              <p className="text-xs text-white/40">{(req.profiles as any)?.email ?? "—"}</p>
            </td>
            <td className="px-4 py-3.5 text-sm font-bold">{req.coin}</td>
            <td className="px-4 py-3.5 text-sm font-bold text-[#ff4d6a]">
              -{req.amount.toLocaleString()}
            </td>
            <td className="px-4 py-3.5 text-sm">${(req.usd_value ?? 0).toLocaleString()}</td>
            <td className="px-4 py-3.5">
              <span className="text-xs font-mono text-white/50">
                {req.to_address?.slice(0, 12)}…
              </span>
            </td>
            <td className="px-4 py-3.5 text-sm text-white/50">{req.network}</td>
            <td className="px-4 py-3.5"><StatusBadge status={req.status} /></td>
            <td className="px-4 py-3.5 text-xs text-white/40 whitespace-nowrap">
              {new Date(req.created_at).toLocaleDateString()}
            </td>
            <td className="px-4 py-3.5">
              {req.status === "pending" ? (
                <button
                  onClick={() => { setSelected(req); setTxHash(""); setAdminNote(""); }}
                  className="px-3 py-1.5 rounded-lg bg-[#FF7900]/15 text-[#FF7900] text-xs font-bold hover:bg-[#FF7900]/25 transition-colors"
                >
                  Review
                </button>
              ) : (
                <button
                  onClick={() => setSelected(req)}
                  className="px-3 py-1.5 rounded-lg bg-white/6 text-xs font-bold hover:bg-white/10 transition-colors"
                >
                  View
                </button>
              )}
            </td>
          </tr>
        ))}
      </AdminTable>

      {/* Review modal */}
      <AdminModal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.status === "pending" ? "Review Withdrawal" : "Withdrawal Details"}
      >
        {selected && (
          <div className="space-y-4">
            {/* Details */}
            <div className="bg-[#1a1a24] rounded-xl p-4 space-y-2">
              {[
                ["User",    (selected.profiles as any)?.name ?? selected.user_id?.slice(0,8)+"…"],
                ["Coin",    selected.coin],
                ["Amount",  `${selected.amount} ${selected.coin}`],
                ["USD",     `$${(selected.usd_value ?? 0).toLocaleString()}`],
                ["Address", selected.to_address],
                ["Network", selected.network],
                ["Status",  selected.status],
                ["Requested", new Date(selected.created_at).toLocaleString()],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/45">{k}</span>
                  <span className="font-semibold text-right break-all max-w-[220px]">{v}</span>
                </div>
              ))}
            </div>

            {/* Action inputs — only if pending */}
            {selected.status === "pending" && (
              <>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    Transaction Hash (for approval)
                  </label>
                  <input
                    type="text"
                    className="field text-sm"
                    placeholder="0x... (optional)"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    Admin Note (shown to user on rejection)
                  </label>
                  <textarea
                    className="field text-sm resize-none"
                    rows={2}
                    placeholder="Optional note..."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction("rejected")}
                    disabled={acting}
                    className="flex-1 py-3 rounded-xl bg-[#ff4d6a]/15 text-[#ff4d6a] border border-[#ff4d6a]/30 text-sm font-bold hover:bg-[#ff4d6a]/25 transition-colors disabled:opacity-50"
                  >
                    ✕ Reject
                  </button>
                  <button
                    onClick={() => handleAction("approved")}
                    disabled={acting}
                    className="flex-1 py-3 rounded-xl bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/30 text-sm font-bold hover:bg-[#00d4aa]/25 transition-colors disabled:opacity-50"
                  >
                    {acting ? "Processing…" : "✓ Approve"}
                  </button>
                </div>
              </>
            )}

            {/* If already reviewed */}
            {selected.status !== "pending" && selected.admin_note && (
              <div className="bg-[#1a1a24] rounded-xl p-3">
                <p className="text-xs text-white/40 mb-1">Admin Note</p>
                <p className="text-sm">{selected.admin_note}</p>
              </div>
            )}
          </div>
        )}
      </AdminModal>
    </div>
  );
}