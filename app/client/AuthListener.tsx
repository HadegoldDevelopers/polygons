"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function AuthListener() {
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_OUT") {
          window.location.reload();
        }
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  return null;
}