"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Sign in
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });

    if (loginError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    // 2. Check admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Authentication failed."); setLoading(false); return; }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      await supabase.auth.signOut();
      setError("Access denied. Admin accounts only.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 rounded-full bg-[#FF7900]/6 blur-[120px]" />
      <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 rounded-full bg-[#FF7900]/4 blur-[120px]" />

      <div className="w-full max-w-[400px] bg-[#111118] border border-white/8 rounded-2xl p-8 shadow-2xl relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#FF7900] flex items-center justify-center font-black text-black text-xl mb-3">
            P
          </div>
          <p className="text-lg font-black">PlutoChain</p>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF7900] mt-0.5">
            Admin Panel
          </span>
        </div>

        <h1 className="text-xl font-black text-center mb-1">Admin Sign In</h1>
        <p className="text-sm text-white/40 text-center mb-6">Restricted access</p>

        {error && (
          <div className="bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 text-[#ff6b82] rounded-lg px-4 py-3 text-sm font-medium mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
              Email
            </label>
            <input
              type="email"
              className="field"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
              Password
            </label>
            <input
              type="password"
              className="field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              "Sign In to Admin →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}