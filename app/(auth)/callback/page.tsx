"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function AuthCallback() {
  useEffect(() => {
    supabase.auth.exchangeCodeForSession(window.location.href);
  }, []);

  return <p>Verifying your email…</p>;
}
