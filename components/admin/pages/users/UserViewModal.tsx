"use client";

import { AdminModal } from "@/components/admin/ui/AdminUI";
import type { AdminProfile } from "@/lib/admin/types";

export default function UserViewModal({
  user,
  open,
  onClose,
}: {
  user: AdminProfile | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!open || !user) return null;

  return (
    <AdminModal open={open} onClose={onClose} title="User Details">
      <div className="space-y-3">
        {[
          ["ID", user.id],
          ["Name", user.name ?? "—"],
          ["Email", user.email],
          ["Role", user.is_admin ? "Admin" : "User"],
          ["Country", user.country ?? "—"],
          ["Phone", user.phone ?? "—"],
          ["Verified", user.is_verified ? "Yes" : "No"],
          ["Banned", user.is_banned ? `Yes — ${user.ban_reason ?? "No reason"}` : "No"],
          ["Joined", new Date(user.created_at).toLocaleString()],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between py-2 border-b border-white/8 last:border-0"
          >
            <span className="text-xs text-white/40 font-semibold">{label}</span>
            <span className="text-sm font-semibold text-right">{value}</span>
          </div>
        ))}
      </div>
    </AdminModal>
  );
}
