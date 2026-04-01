"use client";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="w-full max-w-[440px] bg-[#111118] border border-white/8 rounded-2xl p-10 shadow-2xl relative z-10">
      <div className="flex justify-center mb-8">
        <Logo size="md" />
      </div>

      <div className="text-5xl text-center mb-4">🔑</div>
      <h1 className="text-2xl font-black text-center mb-1">Reset password</h1>
      <p className="text-sm text-white/45 text-center mb-7">
        Enter your email and we&apos;ll send a reset link
      </p>

      {sent ? (
        <div className="bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-[#00d4aa] rounded-lg px-4 py-4 text-sm font-medium text-center mb-6">
          ✓ Reset link sent! Check your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              "Send Reset Link →"
            )}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-white/45 mt-6">
        <Link href="/login" className="text-[#FF7900] font-semibold hover:underline">
          ← Back to login
        </Link>
      </p>
    </div>
  );
}
