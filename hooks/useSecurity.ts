"use client";

import { useState, useCallback } from "react";

export interface SessionItem {
  id: string;
  device: string;
  location: string;
  time: string;
  current: boolean;
}

// This matches the Supabase Admin REST API response for sessions
export interface SupabaseAdminSession {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  factor_id: string | null;
  aal: string | null;
  not_after: string | null;
  refreshed_at: string | null;
  ip: string | null;
  user_agent: string | null;
  is_current: boolean;
}

export function useSecurity() {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load all sessions
  const loadSessions = useCallback(async () => {
    setLoading(true);

    const res = await fetch("/api/security/sessions");
    const data = await res.json();

    if (res.ok) {
      const rawSessions = data.sessions as SupabaseAdminSession[];

      const mapped: SessionItem[] = rawSessions.map((s) => ({
        id: s.id,
        device: s.user_agent ?? "Unknown Device",
        location: s.ip ?? "Unknown",
        time: new Date(s.created_at).toLocaleString(),
        current: s.is_current,
      }));

      setSessions(mapped);
    }

    setLoading(false);
  }, []);

  // Change password
  const changePassword = async (current: string, newPw: string) => {
    const res = await fetch("/api/security/change-password", {
      method: "POST",
      body: JSON.stringify({ current, newPw }),
    });

    return res.json();
  };

  // Revoke one session
  const revokeSession = async (sessionId: string) => {
    const res = await fetch("/api/security/sessions/revoke", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    });

    return res.json();
  };

  // Revoke all except current
  const revokeAllSessions = async () => {
    const res = await fetch("/api/security/sessions/revoke-all", {
      method: "POST",
    });

    return res.json();
  };

  return {
    sessions,
    loading,
    loadSessions,
    changePassword,
    revokeSession,
    revokeAllSessions,
  };
}
