"use client";

import { useEffect, useState } from "react";
import {
  AdminTable,
  SearchBar,
  FilterChip,
  StatusBadge,
  AdminModal,
  TableSkeleton,
} from "@/components/admin/ui/AdminUI";

import type { AdminProfile } from "@/lib/admin/types";

export default function UsersPage() {
  const [users, setUsers] = useState<AdminProfile[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AdminProfile | null>(null);
  const [confirm, setConfirm] = useState<{ type: string; user: AdminProfile } | null>(null);
  const [banReason, setBanReason] = useState("");

  // 🔹 Fetch users
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      setUsers(data.users ?? []);
      setLoading(false);
    };

    load();
  }, []);

  // 🔹 Filter + search
  const filtered = users.filter((u) => {
  const q = search.toLowerCase();

  const matchesSearch =
    !search ||
    u.name?.toLowerCase().includes(q) ||
    u.email?.toLowerCase().includes(q) ||
    u.id.includes(q);

  const matchesFilter =
    filter === "all" ||
    (filter === "banned" && u.is_banned) ||
    (filter === "admin" && u.is_admin === true) ||
    (filter === "verified" && u.is_verified);

  return matchesSearch && matchesFilter;
});

  // 🔹 Helper
  const adminAction = async (body: object) => {
    await fetch("/api/admin/users/actions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  // 🔹 Actions
  const banUser = async () => {
    if (!confirm?.user) return;

    await adminAction({
      action: "ban",
      userId: confirm.user.id,
      payload: { reason: banReason },
    });

    setUsers((prev) =>
      prev.map((u) =>
        u.id === confirm.user.id
          ? { ...u, is_banned: true, ban_reason: banReason }
          : u
      )
    );

    setBanReason("");
  };

  const unbanUser = async (user: AdminProfile) => {
    await adminAction({
      action: "unban",
      userId: user.id,
    });

    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, is_banned: false } : u
      )
    );
  };

  const verifyUser = async (user: AdminProfile) => {
    await adminAction({
      action: "verify",
      userId: user.id,
      payload: { value: !user.is_verified },
    });

    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, is_verified: !u.is_verified }
          : u
      )
    );
  };

  const makeAdmin = async (user: AdminProfile) => {
    const newRole = !user.is_admin

    await adminAction({
      action: "is_admin",
      userId: user.id,
      payload: { is_admin: newRole },
    });

    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, is_admin: newRole } : u
      )
    );
  };


  if (loading) return <TableSkeleton rows={8} cols={6} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black mb-0.5">Users</h1>
          <p className="text-sm text-white/40">
            {filtered.length} of {users.length} users
          </p>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search by name, email or ID...">
        {["all", "admin", "verified", "banned"].map((f) => (
          <FilterChip
            key={f}
            label={f.charAt(0).toUpperCase() + f.slice(1)}
            active={filter === f}
            onClick={() => setFilter(f)}
          />
        ))}
      </SearchBar>

      <AdminTable
        headers={["User", "Email", "Role", "Status", "Country", "Joined", "Actions"]}
        isEmpty={filtered.length === 0}
      >
        {filtered.map((user) => (
          <tr key={user.id} className="hover:bg-white/2 transition-colors">
            <td className="px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7900] to-[#ff4d6a] flex items-center justify-center text-xs font-black text-black flex-shrink-0">
                  {user.name?.charAt(0)?.toUpperCase() ?? "?"}
                </div>
                <div>
                  <p className="text-sm font-bold">{user.name ?? "—"}</p>
                  <p className="text-[10px] font-mono text-white/30">
                    {user.id.slice(0, 8)}…
                  </p>
                </div>
              </div>
            </td>

            <td className="px-4 py-3.5 text-sm text-white/60">
              {user.email}
            </td>

            <td className="px-4 py-3.5">
              <StatusBadge status={user.is_admin === true ? "is_admin" : "user"} />
            </td>
            
            <td className="px-4 py-3.5">
              <div className="flex flex-col gap-1">
                {user.is_banned && <StatusBadge status="banned" />}
                {user.is_verified && <StatusBadge status="verified" />}
                {!user.is_banned && !user.is_verified && (<StatusBadge status="user" />)}
              </div>
            </td>

            <td className="px-4 py-3.5 text-sm text-white/50">
              {user.country ?? "—"}
            </td>

            <td className="px-4 py-3.5 text-xs text-white/40 whitespace-nowrap">
              {new Date(user.created_at).toLocaleDateString()}
            </td>

            <td className="px-4 py-3.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setSelected(user)}
                  className="px-2.5 py-1 rounded-lg bg-white/6 text-xs font-bold hover:bg-white/10 transition-colors"
                >
                  View
                </button>

                <button
                  onClick={() => verifyUser(user)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    user.is_verified
                      ? "bg-blue-400/10 text-blue-400 hover:bg-blue-400/20"
                      : "bg-white/6 hover:bg-white/10"
                  }`}
                >
                  {user.is_verified ? "Unverify" : "Verify"}
                </button>

                {user.is_banned ? (
                  <button
                    onClick={() => unbanUser(user)}
                    className="px-2.5 py-1 rounded-lg bg-[#00d4aa]/10 text-[#00d4aa] text-xs font-bold hover:bg-[#00d4aa]/20 transition-colors"
                  >
                    Unban
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirm({ type: "ban", user })}
                    className="px-2.5 py-1 rounded-lg bg-[#ff4d6a]/10 text-[#ff4d6a] text-xs font-bold hover:bg-[#ff4d6a]/20 transition-colors"
                  >
                    Ban
                  </button>
                )}

                <button
                  onClick={() => makeAdmin(user)}
                  className="px-2.5 py-1 rounded-lg bg-[#FF7900]/10 text-[#FF7900] text-xs font-bold hover:bg-[#FF7900]/20 transition-colors"
                >
                  {user.is_admin === true ? "Remove Admin" : "Make Admin"}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      {/* Modal */}
      <AdminModal open={!!selected} onClose={() => setSelected(null)} title="User Details">
        {selected && (
          <div className="space-y-3">
            {[
              ["ID", selected.id],
              ["Name", selected.name ?? "—"],
              ["Email", selected.email],
              ["Role", selected.is_admin === true ? "Admin" : "User"],
              ["Country", selected.country ?? "—"],
              ["Phone", selected.phone ?? "—"],
              ["Verified", selected.is_verified ? "Yes" : "No"],
              ["Banned", selected.is_banned ? `Yes — ${selected.ban_reason ?? "No reason"}` : "No"],
              ["Joined", new Date(selected.created_at).toLocaleString()],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-white/8 last:border-0">
                <span className="text-xs text-white/40 font-semibold">{k}</span>
                <span className="text-sm font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>
        )}
      </AdminModal>

      {/* Ban modal */}
      {confirm?.type === "ban" && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111118] border border-white/8 rounded-2xl p-6 w-full max-w-[400px]">
            <h3 className="text-base font-black mb-2">Ban User</h3>
            <input
              type="text"
              className="field mb-4 text-sm"
              placeholder="Reason"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
            />
            <button
              onClick={() => {
                banUser();
                setConfirm(null);
              }}
              className="w-full py-2 bg-red-500 text-white rounded-lg"
            >
              Confirm Ban
            </button>
          </div>
        </div>
      )}
    </div>
  );
}