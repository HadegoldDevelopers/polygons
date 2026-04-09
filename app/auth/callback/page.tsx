"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "error">("verifying");
  const [message, setMessage] = useState("Verifying your email…");

  useEffect(() => {
    const run = async () => {
      try {
        // Exchange the code in the URL for a session
        const { data, error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );

        if (error) {
          console.error("Exchange error:", error);
          setStatus("error");
          setMessage("Verification failed. Redirecting to login…");
          setTimeout(() => router.replace("/login?error=verification_failed"), 2000);
          return;
        }

        if (!data.session) {
          setStatus("error");
          setMessage("No session found. Redirecting to login…");
          setTimeout(() => router.replace("/login"), 2000);
          return;
        }

        setMessage("Email verified! Redirecting to dashboard…");

        // router.refresh() tells Next.js server to re-read the
        // session cookie that exchangeCodeForSession just set
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
      <div className="flex flex-col items-center gap-4 text-center">

        {status === "verifying" ? (
          <>
            <span className="w-10 h-10 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
            <p className="text-sm text-white/40">{message}</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 flex items-center justify-center text-xl">
              ✕
            </div>
            <p className="text-sm text-[#ff4d6a]">{message}</p>
          </>
        )}

      </div>
    </div>
  );
}