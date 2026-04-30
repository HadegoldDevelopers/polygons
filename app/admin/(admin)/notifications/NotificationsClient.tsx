"use client";

import { AdminNotification, AdminProfile } from "@/lib/admin/types";
import { useEffect, useState } from "react";

export default function NotificationsClient() {
 const [users, setUsers] = useState<AdminProfile[]>([]);
 const [recent, setRecent] = useState<AdminNotification[]>([]);
 const [target, setTarget] = useState<"all" | "specific">("all");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);


  //
  // 1. Helper functions (must be defined BEFORE useEffect)
  //
  async function loadUsers() {
  const res = await fetch("/api/admin/users", { cache: "no-store" });
  const data: AdminProfile[] = await res.json();
  setUsers(Array.isArray(data) ? data : []);
}

async function loadRecent() {
  const res = await fetch("/api/admin/notifications", { cache: "no-store" });
  const data: AdminNotification[] = await res.json();
  setRecent(Array.isArray(data) ? data : []);
}
  //
  // 2. Load initial data (React‑approved pattern)
  //
  useEffect(() => {
    async function load() {
      await loadUsers();
      await loadRecent();
    }
    load();
  }, []);

  //
  // 3. Send notification
  //
  const send = async () => {
    if (!message.trim()) return;
    setSending(true);

    const targetUsers =
      target === "all" ? users.map((u) => u.id) : [userId];

    await fetch("/api/admin/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_ids: targetUsers,
        text: message,
      }),
    });

    await loadRecent();

    setMessage("");
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

   return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-black mb-0.5">Send Notifications</h1>
        <p className="text-sm text-white/40">Send messages to users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compose */}
        <div className="bg-[#111118] border border-white/8 rounded-2xl p-5">
          <h3 className="text-sm font-bold mb-5">Compose Notification</h3>

          {/* Target */}
          <div className="mb-4">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Send To</label>
            <div className="flex gap-2">
              <button
                onClick={() => setTarget("all")}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                  target === "all"
                    ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                    : "bg-[#1a1a24] border-white/8"
                }`}
              >
                All Users ({users.length})
              </button>
              <button
                onClick={() => setTarget("specific")}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                  target === "specific"
                    ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
                    : "bg-[#1a1a24] border-white/8"
                }`}
              >
                Specific User
              </button>
            </div>
          </div>

          {/* User picker */}
          {target === "specific" && (
            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Select User</label>
              <select
                className="field text-sm cursor-pointer"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              >
                <option value="">— Select a user —</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>
          )}

          {/* Message */}
          <div className="mb-5">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Message</label>
            <textarea
              className="field text-sm resize-none"
              rows={4}
              placeholder="Type your notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className="text-xs text-white/30 mt-1">{message.length} characters</p>
          </div>

          {sent && (
            <div className="bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-[#00d4aa] rounded-xl px-4 py-3 text-sm font-bold mb-4">
              ✓ Notification sent successfully!
            </div>
          )}

          <button
            onClick={send}
            disabled={sending || !message.trim() || (target === "specific" && !userId)}
            className="btn-primary disabled:opacity-50"
          >
            {sending
              ? "Sending…"
              : target === "all"
              ? `📢 Send to All ${users.length} Users`
              : "📨 Send to User"}
          </button>
        </div>

        {/* Recent notifications */}
        <div className="bg-[#111118] border border-white/8 rounded-2xl p-5">
          <h3 className="text-sm font-bold mb-4">Recently Sent</h3>
          <div className="space-y-2 max-h-100 overflow-y-auto">
            {recent.length === 0 && (
              <p className="text-sm text-white/30 text-center py-8">No notifications sent yet</p>
            )}
            {recent.map((n) => (
              <div key={n.id} className="bg-[#1a1a24] rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-[#FF7900]">
                    {n.profiles?.name ?? "Unknown User"}
                  </p>
                  <p className="text-[10px] text-white/30">
                    {new Date(n.time).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-white/70">{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}