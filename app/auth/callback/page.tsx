"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();
  const ran    = useRef(false);
  const [status,  setStatus]  = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("Verifying your email…");

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const run = async () => {
      try {
        // Step 1 — check if session already exists
        const { data: { session: existing } } = await supabase.auth.getSession();
        if (existing) {
          setStatus("success");
          setMessage("Email verified! Redirecting…");
          router.replace("/dashboard");
          router.refresh();
          return;
        }

        // Step 2 — check for error in URL
        const url          = new URL(window.location.href);
        const code         = url.searchParams.get("code");
        const urlError     = url.searchParams.get("error");
        const urlErrorDesc = url.searchParams.get("error_description");

        if (urlError) {
          console.error("Auth URL error:", urlError, urlErrorDesc);
          setStatus("error");
          setMessage(urlErrorDesc ?? "Verification link expired. Please request a new one.");
          setTimeout(() => router.replace("/login"), 3000);
          return;
        }

        // Step 3 — handle hash-based flow (no code param)
        if (!code) {
          const hash = window.location.hash;
          if (hash?.includes("access_token")) {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
              setStatus("success");
              setMessage("Email verified! Redirecting…");
              router.replace("/dashboard");
              router.refresh();
              return;
            }
          }
          setStatus("error");
          setMessage("No verification code found. Please use the link from your email.");
          setTimeout(() => router.replace("/login"), 3000);
          return;
        }

        // Step 4 — exchange code for session (PKCE flow)
        const { data, error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );

        if (error) {
          console.error("Exchange error:", error.message, error.status);

          // 404 means code was already used (React StrictMode runs useEffect twice)
          // Check if session exists anyway before showing an error
          if (error.status === 404 || error.message?.includes("already")) {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
              // Session exists — verification worked, just redirect silently
              setStatus("success");
              setMessage("Email verified! Redirecting…");
              router.replace("/dashboard");
              router.refresh();
              return;
            }
          }

          // Only reach here if there is genuinely no session
          setStatus("error");
          setMessage("Link expired or already used. Please request a new verification email.");
          setTimeout(() => router.replace("/login?error=expired"), 3000);
          return;
        }

        if (!data.session) {
          setStatus("error");
          setMessage("Verification failed. Please try logging in.");
          setTimeout(() => router.replace("/login"), 3000);
          return;
        }

        setStatus("success");
        setMessage("Email verified! Redirecting to dashboard…");
        router.replace("/dashboard");
        router.refresh();

      } catch (err) {
        console.error("Callback error:", err);
        setStatus("error");
        setMessage("Something went wrong. Redirecting to login…");
        setTimeout(() => router.replace("/login"), 2000);
      }
    };

    run();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">

        {status === "verifying" && (
          <>
            <span className="w-10 h-10 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
            <p className="text-sm text-white/40">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center text-2xl">
              ✓
            </div>
            <p className="text-sm text-[#00d4aa] font-semibold">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 rounded-full bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 flex items-center justify-center text-2xl">
              ✕
            </div>
            <p className="text-sm text-[#ff4d6a] font-semibold mb-1">{message}</p>
            <p className="text-xs text-white/30">Redirecting automatically…</p>
            <button
              onClick={() => router.replace("/login")}
              className="text-xs text-[#FF7900] underline mt-2"
            >
              Go to login now →
            </button>
          </>
        )}

      </div>
    </div>
  );
}