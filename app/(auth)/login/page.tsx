"use client";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo, PasswordInput } from "@/components/ui";


export default function LoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (loginError) {
      setError("Invalid email or password.");
      return;
    }

    // router.refresh() is critical — tells Next.js server to
    // re-read the session cookie that Supabase just set
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-[440px] bg-[#111118] border border-white/8 rounded-2xl p-10 shadow-2xl relative z-10">
      <div className="flex justify-center mb-8">
        <Logo size="md" />
      </div>

      <h1 className="text-2xl font-black text-center mb-1">Welcome back 👋</h1>
      <p className="text-sm text-white/45 text-center mb-7">
        Sign in to your account to access the dashboard and manage your stakes.
      </p>

      {error && (
        <div className="bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 text-[#ff6b82] rounded-lg px-4 py-3 text-sm font-medium mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            Email address
          </label>
          <input
            type="email"
            className="field"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            Password
          </label>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-white/45 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-[#FF7900] w-4 h-4"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-[#FF7900] font-semibold hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            "Sign In →"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5 text-white/30 text-xs">
        <div className="flex-1 h-px bg-white/8" />
        or continue with
        <div className="flex-1 h-px bg-white/8" />
      </div>

      {/* OAuth buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          className="btn-ghost text-sm py-2.5"
          onClick={async () => {
            await supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: `${window.location.origin}/dashboard` },
            });
          }}
        >
          🌐 Google
        </button>
        <button className="btn-ghost text-sm py-2.5">
          🦊 MetaMask
        </button>
      </div>

      <p className="text-center text-sm text-white/45 mt-6">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-[#FF7900] font-semibold hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}