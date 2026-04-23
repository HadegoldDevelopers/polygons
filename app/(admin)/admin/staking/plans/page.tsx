"use client";
import { useEffect, useState } from "react";
import { AdminModal, TableSkeleton } from "@/components/admin/ui/AdminUI";
import type { StakingPlan } from "@/lib/admin/types";

const emptyPlan: Partial<StakingPlan> = {
  name: "",
  min_deposit: 0,
  max_deposit: undefined,
  daily_profit: 0,
  apr: 0,
  duration_days: 30,
  referral_bonus: 0,
  notes: [],
};

export default function StakingPlansPage() {
  const [plans, setPlans] = useState<StakingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Partial<StakingPlan>>(emptyPlan);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [noteInput, setNoteInput] = useState("");

  const load = async () => {
    const res = await fetch("/api/admin/staking/plans");
    const json = await res.json();
    setPlans(json.plans ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);

    const payload = {
      name: editing.name,
      min_deposit: editing.min_deposit,
      max_deposit: editing.max_deposit ?? null,
      daily_profit: editing.daily_profit ?? 0,
      apr: editing.apr ?? 0,
      duration_days: editing.duration_days ?? 30,
      referral_bonus: editing.referral_bonus ?? 0,
      notes: editing.notes ?? [],
    };

    if (isEdit && editing.id) {
      await fetch("/api/admin/staking/plans", {
        method: "PATCH",
        body: JSON.stringify({ id: editing.id, ...payload }),
      });
    } else {
      await fetch("/api/admin/staking/plans", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    await load();
    setModal(false);
    setSaving(false);
  };

  const deletePlan = async (id: string) => {
    await fetch("/api/admin/staking/plans", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    setPlans((prev) => prev.filter((p) => p.id !== id));
  };
  const openCreate = () => {
    setEditing(emptyPlan);
    setIsEdit(false);
    setNoteInput("");
    setModal(true);
  };

  const openEdit = (plan: StakingPlan) => {
    setEditing({ ...plan });
    setIsEdit(true);
    setNoteInput("");
    setModal(true);
  };

  const addNote = () => {
    if (!noteInput.trim()) return;
    setEditing((prev) => ({
      ...prev,
      notes: [...(prev.notes ?? []), noteInput.trim()],
    }));
    setNoteInput("");
  };

  const removeNote = (i: number) => {
    setEditing((prev) => ({
      ...prev,
      notes: prev.notes?.filter((_, idx) => idx !== i),
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black mb-0.5">Pricing</h1>
          <p className="text-sm text-white/40">{plans.length} plans</p>
        </div>
        <button onClick={openCreate} className="btn-primary max-w-[160px] py-2.5">
          + Create Plan
        </button>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-[#111118] border border-white/8 rounded-2xl p-5 hover:border-[#FF7900]/35 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-black">{plan.name}</h3>
                <p className="text-xs text-white/40 mt-0.5">{plan.duration_days} days lock</p>
              </div>
              <span className="text-2xl font-black text-[#FF7900]">{plan.apr}%</span>
            </div>

            <div className="space-y-2 mb-4">
              {[
                ["Min Deposit",    `$${(plan.min_deposit ?? 0).toLocaleString()}`],
                ["Max Deposit",    plan.max_deposit ? `$${plan.max_deposit.toLocaleString()}` : "Unlimited"],
                ["Daily Profit",  `${plan.daily_profit ?? 0}%`],
                ["Referral Bonus",`${plan.referral_bonus ?? 0}%`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/40">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>

            {plan.notes && plan.notes.length > 0 && (
              <ul className="mb-4 space-y-1">
                {plan.notes.map((note, i) => (
                  <li key={i} className="text-xs text-white/50 flex items-start gap-1.5">
                    <span className="text-[#FF7900] mt-0.5">•</span> {note}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => openEdit(plan)}
                className="flex-1 py-2 rounded-xl bg-[#FF7900]/10 text-[#FF7900] text-xs font-bold hover:bg-[#FF7900]/20 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deletePlan(plan.id)}
                className="flex-1 py-2 rounded-xl bg-[#ff4d6a]/10 text-[#ff4d6a] text-xs font-bold hover:bg-[#ff4d6a]/20 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit modal */}
      <AdminModal
        open={modal}
        onClose={() => setModal(false)}
        title={isEdit ? "Edit Staking Plan" : "Create Staking Plan"}
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Plan Name</label>
            <input type="text" className="field text-sm" placeholder="e.g. Silver Plan"
              value={editing.name ?? ""} onChange={(e) => setEditing((p) => ({ ...p, name: e.target.value }))} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Min Deposit ($)</label>
              <input type="number" className="field text-sm"
                value={editing.min_deposit ?? 0}
                onChange={(e) => setEditing((p) => ({ ...p, min_deposit: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Max Deposit ($)</label>
              <input type="number" className="field text-sm" placeholder="Leave blank = unlimited"
                value={editing.max_deposit ?? ""}
                onChange={(e) => setEditing((p) => ({ ...p, max_deposit: e.target.value ? Number(e.target.value) : undefined }))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">APR (%)</label>
              <input type="number" className="field text-sm"
                value={editing.apr ?? 0}
                onChange={(e) => setEditing((p) => ({ ...p, apr: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Daily Profit (%)</label>
              <input type="number" className="field text-sm" step="0.01"
                value={editing.daily_profit ?? 0}
                onChange={(e) => setEditing((p) => ({ ...p, daily_profit: Number(e.target.value) }))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Duration (days)</label>
              <input type="number" className="field text-sm"
                value={editing.duration_days ?? 30}
                onChange={(e) => setEditing((p) => ({ ...p, duration_days: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Referral Bonus (%)</label>
              <input type="number" className="field text-sm" step="0.1"
                value={editing.referral_bonus ?? 0}
                onChange={(e) => setEditing((p) => ({ ...p, referral_bonus: Number(e.target.value) }))} />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Plan Features</label>
            <div className="flex gap-2 mb-2">
              <input type="text" className="field text-sm flex-1" placeholder="Add a feature..."
                value={noteInput} onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNote()} />
              <button onClick={addNote} className="px-4 py-2 rounded-xl bg-[#FF7900]/15 text-[#FF7900] text-sm font-bold">
                Add
              </button>
            </div>
            <div className="space-y-1.5">
              {(editing.notes ?? []).map((note, i) => (
                <div key={i} className="flex items-center justify-between bg-[#1a1a24] rounded-lg px-3 py-2">
                  <span className="text-sm">{note}</span>
                  <button onClick={() => removeNote(i)} className="text-[#ff4d6a] text-xs ml-2">✕</button>
                </div>
              ))}
            </div>
          </div>

          <button onClick={save} disabled={saving} className="btn-primary">
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Plan"}
          </button>
        </div>
      </AdminModal>
    </div>
  );
}