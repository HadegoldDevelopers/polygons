"use client";

import { useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase/supabaseBrowser";

export default function AuthCallback() {
  useEffect(() => {
    supabaseBrowser().auth.exchangeCodeForSession(window.location.href);
  }, []);

  return <p>Verifying your email…</p>;
}
