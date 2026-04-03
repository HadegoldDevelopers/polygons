"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Logo, PasswordInput, StrengthMeter } from "@/components/ui";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!terms) {
      setError("Please accept the Terms of Service.");
      return;
    }

    setLoading(true);

    // 🔐 SIGN UP USER
    const { data, error: signupError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setError("Signup failed.");
      setLoading(false);
      return;
    }

    // -----------------------------------------
    // ✅ CREATE DATABASE RECORDS FOR NEW USER
    // -----------------------------------------

    // 1. Create profile
    await supabase.from("profiles").insert({
      id: user.id,
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      country: form.country,
      phone: form.phone,
    });

    //2.  Create only the Coins wallet at signup
function generateHexAddress() {
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return "0x" + hex;
}

const coins = ["POLYC", "USDT", "BTC", "ETH"];

const walletRows = coins.map((symbol) => ({
  id: crypto.randomUUID(),
  user_id: user.id,
  symbol,
  address: generateHexAddress(),
  amount: 0,
  usd_value: 0,
  price: 0.2,
  change_pct: 0,
}));

await supabase.from("wallets").insert(walletRows);


    setLoading(false);

    // 4. Redirect to dashboard
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-[440px] bg-[#111118] border border-white/8 rounded-2xl p-10 shadow-2xl relative z-10">
      <div className="flex justify-center mb-8">
        <Link href="/" className="flex items-center gap-2"> 
        <Logo size="md" />
        </Link>
       
      </div>

      <h1 className="text-2xl font-black text-center mb-1">Create account</h1>
      <p className="text-sm text-white/45 text-center mb-7">
        Join PlutoChain and start trading
      </p>

      {error && (
        <div className="bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 text-[#ff6b82] rounded-lg px-4 py-3 text-sm font-medium mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
              First name
            </label>
            <input
              type="text"
              className="field"
              placeholder="John"
              value={form.firstName}
              onChange={set("firstName")}
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
              Last name
            </label>
            <input
              type="text"
              className="field"
              placeholder="Doe"
              value={form.lastName}
              onChange={set("lastName")}
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            Email address
          </label>
          <input
            type="email"
            className="field"
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            Country
          </label>
          <input
            type="text"
            className="field"
            placeholder="United States"
            value={form.country}
            onChange={set("country")}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            Phone number
          </label>
          <input
            type="number"
            className="field"
            placeholder="+1 555-123-4567"
            value={form.phone}
            onChange={set("phone")}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            Password
          </label>
          <PasswordInput
            id="password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={set("password")}
          />
          <StrengthMeter password={form.password} />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            Confirm password
          </label>
          <PasswordInput
            id="confirm"
            placeholder="Repeat password"
            value={form.confirm}
            onChange={set("confirm")}
          />
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer text-sm text-white/45">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="accent-[#FF7900] w-4 h-4 mt-0.5"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="text-[#FF7900]">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#FF7900]">
              Privacy Policy
            </a>
          </span>
        </label>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            "Create Account →"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-white/45 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#FF7900] font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
