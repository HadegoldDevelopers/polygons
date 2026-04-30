"use client";

import type { AdminPlanPosition } from "@/lib/admin/types";

type Props = {
  editing: AdminPlanPosition;
  closeEdit: () => void;
  handleSave: () => void;
  saving: boolean;
  setEditing: (
    fn: (prev: AdminPlanPosition | null) => AdminPlanPosition | null
  ) => void;
};

export default function EditPlanModal({
  editing,
  closeEdit,
  handleSave,
  saving,
  setEditing,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0d0d14] border border-white/10 rounded-xl w-full max-w-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            Edit Plan Position
          </h2>
          <button
            onClick={closeEdit}
            className="text-white/50 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-3 text-xs">
          {/* User */}
          <div>
            <p className="text-white/60 mb-1">User</p>
            <p className="text-white">
              {editing.profiles?.name ?? "Unknown"}{" "}
              <span className="text-white/40">
                ({editing.profiles?.email ?? editing.user_id})
              </span>
            </p>
          </div>

          {/* Amount + Earned */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white/60 mb-1">Amount (USD)</label>
              <input
                type="number"
                value={editing.amount}
                onChange={(e) =>
                  setEditing((prev) =>
                    prev ? { ...prev, amount: Number(e.target.value) } : prev
                  )
                }
                className="w-full bg-[#11111a] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-white/60 mb-1">
                Earned so far (USD)
              </label>
              <input
                type="number"
                value={editing.earned_so_far}
                onChange={(e) =>
                  setEditing((prev) =>
                    prev
                      ? { ...prev, earned_so_far: Number(e.target.value) }
                      : prev
                  )
                }
                className="w-full bg-[#11111a] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          {/* Status + End Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white/60 mb-1">Status</label>
              <select
                value={editing.status}
                onChange={(e) =>
                  setEditing((prev) =>
                    prev ? { ...prev, status: e.target.value } : prev
                  )
                }
                className="w-full bg-[#11111a] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-white/60 mb-1">End date</label>
              <input
                type="datetime-local"
                value={new Date(editing.end_date).toISOString().slice(0, 16)}
                onChange={(e) =>
                  setEditing((prev) =>
                    prev
                      ? {
                          ...prev,
                          end_date: new Date(e.target.value).toISOString(),
                        }
                      : prev
                  )
                }
                className="w-full bg-[#11111a] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={closeEdit}
            className="px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-1.5 rounded-lg text-xs bg-[#FF7900] text-black font-semibold hover:bg-[#ff9933] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
