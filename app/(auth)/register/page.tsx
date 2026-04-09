"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Logo, PasswordInput, StrengthMeter } from "@/components/ui";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    setReferralCode(searchParams.get("ref"));
  }, [searchParams]);

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

  function generateHexAddress() {
    return (
      "0x" +
      Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("")
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // VALIDATION
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

    // SIGN UP
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

    try {
      // 1. CREATE PROFILE
      await supabase.from("profiles").insert({
        id: user.id,
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        country: form.country,
        phone: form.phone,
      });

      // 2. CREATE WALLETS
      const coins = [
        "POLYC",
        "USDT",
        "BTC",
        "ETH",
        "BNB",
        "ADA",
        "SOL",
        "XRP",
        "DOT",
        "DOGE",
      ];

      const walletRows = coins.map((symbol) => ({
        id: Math.random().toString(36).substring(2),
        user_id: user.id,
        symbol,
        address: generateHexAddress(),
        amount: 0,
        usd_value: 0,
        price: 0.2,
        change_pct: 0,
      }));

      await supabase.from("wallets").insert(walletRows);

      // 3. REFERRAL HANDLING
      let referrerId: string | null = null;

      if (referralCode) {
        const { data: refUser } = await supabase
          .from("profiles")
          .select("id")
          .eq("referral_code", referralCode)
          .single();

        if (refUser) {
          referrerId = refUser.id;
        }
      }

      const email = user.email ?? "user";

      const newReferralCode =
        email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toUpperCase() +
        Math.floor(1000 + Math.random() * 9000);

      await supabase
        .from("profiles")
        .update({
          referral_code: newReferralCode,
          referred_by: referrerId,
        })
        .eq("id", user.id);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-[440px] bg-[#111118] border border-white/8 rounded-2xl p-10 shadow-2xl relative z-10">
      <div className="flex justify-center mb-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
      </div>

      <h1 className="text-2xl font-black text-center mb-1">
        Create account
      </h1>
      <p className="text-sm text-white/45 text-center mb-7">
        Join PlutoChain and start trading
      </p>

      {error && (
        <div className="bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 text-[#ff6b82] rounded-lg px-4 py-3 text-sm font-medium mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="field" placeholder="First name" value={form.firstName} onChange={set("firstName")} />
        <input className="field" placeholder="Last name" value={form.lastName} onChange={set("lastName")} />
        <input className="field" type="email" placeholder="Email" value={form.email} onChange={set("email")} />
        <input className="field" placeholder="Country" value={form.country} onChange={set("country")} />
        <input className="field" placeholder="Phone" value={form.phone} onChange={set("phone")} />

        <PasswordInput
          id="password"
          placeholder="Password"
          value={form.password}
          onChange={set("password")}
        />
        <StrengthMeter password={form.password} />

        <PasswordInput
          id="confirm"
          placeholder="Confirm password"
          value={form.confirm}
          onChange={set("confirm")}
        />

        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          I agree to Terms
        </label>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-500">
          Sign in
        </Link>
      </p>
    </div>
  );
}