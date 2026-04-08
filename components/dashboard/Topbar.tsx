"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/supabaseClient";

// ── Types ──────────────────────────────────────────────────────────
interface Profile {
  id: string;
  name: string;
  email: string;
}

interface Notification {
  id: string;
  user_id: string;
  text: string;
  time: string;
  read: boolean;
}

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

const PAGE_SIZE = 10;

// ── Component ──────────────────────────────────────────────────────
export default function Topbar({ title, onMenuClick }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs,    setNotifs]    = useState<Notification[]>([]);
  const [profile,   setProfile]   = useState<Profile | null>(null);
  const [page,      setPage]      = useState(1);
  const [hasMore,   setHasMore]   = useState(true);

  // ── Load more (pagination) ───────────────────────────────────────
  const loadMore = async () => {
    if (!profile || !hasMore) return;

    const { data: more, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", profile.id)
      .order("time", { ascending: false })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    if (!error && more) {
      setNotifs((prev) => [...prev, ...more]);
      if (more.length < PAGE_SIZE) {
        setHasMore(false);
      } else {
        setPage((p) => p + 1);
      }
    }
  };

  // ── Load profile + notifications + realtime ──────────────────────
  useEffect(() => {
    let channelName: string | null = null;

    const load = async () => {
      // 1. Get authenticated user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // 2. Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      // 3. Load initial notifications
      const { data: notifData } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("time", { ascending: false })
        .limit(PAGE_SIZE);

      setNotifs(notifData || []);
      setHasMore((notifData || []).length === PAGE_SIZE);

      // 4. Set up realtime subscription
      // ⭐ KEY FIX: Remove any existing channel with the same name first
      //    This prevents the "cannot add callbacks after subscribe()" error
      //    which happens when React StrictMode / hot reload re-runs the effect
      channelName = `notifications-${user.id}`;
      await supabase.removeChannel(supabase.channel(channelName));

      // 5. Create fresh channel — .on() MUST come before .subscribe()
      supabase
        .channel(channelName)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            setNotifs((prev) => [payload.new as Notification, ...prev]);
          }
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            console.log("Realtime notifications connected");
          }
        });
    };

    load();

    // ⭐ Cleanup — always remove the channel on unmount
    return () => {
      if (channelName) {
        supabase.removeChannel(supabase.channel(channelName));
      }
    };
  }, []); // Empty deps — only run once on mount

  // ── Mark all read ────────────────────────────────────────────────
  const markAllRead = async () => {
    if (!profile) return;

    // Optimistic update
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", profile.id)
      .eq("read", false);
  };

  // ── Loading state ────────────────────────────────────────────────
  if (!profile) {
    return (
      <header className="h-16 flex items-center px-6 border-b border-white/8 bg-[#0a0a0f] sticky top-0 z-40">
        <h2 className="text-lg font-bold">{title}</h2>
      </header>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  const unread = notifs.filter((n) => !n.read).length;

  // ── Render ───────────────────────────────────────────────────────
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

        {/* ── Notifications ─────────────────────────────────────── */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="w-9 h-9 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-base relative hover:border-[#FF7900]/35 transition-colors"
          >
            🔔
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF7900] border-2 border-[#0a0a0f]" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 w-80 bg-[#111118] border border-white/8 rounded-2xl shadow-2xl z-50">

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                <h4 className="text-sm font-bold">Notifications</h4>
                <button
                  onClick={markAllRead}
                  className="text-xs text-[#FF7900] font-semibold hover:underline"
                >
                  Mark all read
                </button>
              </div>

              {/* List */}
              <div className="max-h-80 overflow-y-auto">
                {notifs.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-white/30">
                    No notifications yet
                  </div>
                ) : (
                  notifs.map((n) => (
                    <div
                      key={n.id}
                      className="flex gap-2.5 px-4 py-3.5 hover:bg-white/4 cursor-pointer border-b border-white/8 last:border-0"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          n.read ? "bg-white/10" : "bg-[#FF7900]"
                        }`}
                      />
                      <div>
                        <p className={`text-[13px] font-medium ${n.read ? "text-white/40" : ""}`}>
                          {n.text}
                        </p>
                        <p className="text-[11px] text-white/30 mt-0.5">
                          {new Date(n.time).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {/* Load more */}
                {hasMore && notifs.length > 0 && (
                  <button
                    onClick={loadMore}
                    className="w-full text-center py-3 text-xs font-semibold text-[#FF7900] hover:bg-white/5"
                  >
                    Load more
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── User avatar ───────────────────────────────────────── */}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-lg border border-white/8 hover:border-[#FF7900]/35 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF7900] to-[#ff4d6a] flex items-center justify-center text-xs font-black text-black">
            {initials}
          </div>
          <span className="text-sm font-semibold hidden sm:block">
            {profile.name}
          </span>
        </Link>
      </div>
    </header>
  );
}