"use client";
import { useState } from "react";
import Link from "next/link";

const notifications = [
  { id: 1, text: "Deposit of 5,000 PLUTO confirmed ✓", time: "2 min ago", read: false },
  { id: 2, text: "Staking reward of 54 PLUTO credited", time: "1 hour ago", read: false },
  { id: 3, text: "PLUTO price up 4.46% in 24h 📈", time: "3 hours ago", read: false },
  { id: 4, text: "Welcome to PlutoChain App!", time: "2 days ago", read: true },
];

export default function Topbar({ title, onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/8 bg-[#0a0a0f] sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden w-9 h-9 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-lg"
        >
          ☰
        </button>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-9 h-9 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-base relative hover:border-[#FF7900]/35 transition-colors"
          >
            🔔
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF7900] border-2 border-[#0a0a0f]" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 w-80 bg-[#111118] border border-white/8 rounded-2xl shadow-2xl z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                <h4 className="text-sm font-bold">Notifications</h4>
                <button onClick={markAllRead} className="text-xs text-[#FF7900] font-semibold">
                  Mark all read
                </button>
              </div>
              {notifs.map((n) => (
                <div key={n.id} className="flex gap-2.5 px-4 py-3.5 hover:bg-white/4 cursor-pointer border-b border-white/8 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? "bg-white/10" : "bg-[#FF7900]"}`} />
                  <div>
                    <p className={`text-[13px] font-medium ${n.read ? "text-white/40" : ""}`}>{n.text}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User */}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-lg border border-white/8 hover:border-[#FF7900]/35 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF7900] to-[#ff4d6a] flex items-center justify-center text-xs font-black text-black">
            JD
          </div>
          <span className="text-sm font-semibold hidden sm:block">John Doe</span>
        </Link>
      </div>
    </header>
  );
}
