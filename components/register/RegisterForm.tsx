// app/(auth)/register/RegisterForm.tsx
// This is a separate "use client" component
// It must be inside <Suspense> because it uses useSearchParams()
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Logo, PasswordInput, StrengthMeter } from "@/components/ui";

function generateHexAddress(): string {
  return (
    "0x" +
    Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")
  );
}

const COINS = [
  "POLYC", "USDT", "BTC", "ETH", "BNB",
  "ADA", "SOL", "XRP", "DOT", "DOGE",
];

export default function RegisterForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    setReferralCode(searchParams.get("ref"));
  }, [searchParams]);

  const [form, setForm] = useState({
    firstName: "",
    lastName:  "",
    email:     "",
    country:   "",
    phone:     "",
    password:  "",
    confirm:   "",
  });

  const [terms,   setTerms]   = useState(false);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields.");
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

    // 1. Sign up with Supabase Auth
    const { data, error: signupError } = await supabase.auth.signUp({
      email:    form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        data: {
          first_name: form.firstName,
          last_name:  form.lastName,
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
      setError("Signup failed. Please try again.");
      setLoading(false);
      return;
    }

    try {
      // 2. Generate referral code for new user
      const newReferralCode =
        form.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 5) +
        Math.floor(1000 + Math.random() * 9000);

      // 3. Resolve referrer if referral code was passed in URL
      let referrerId: string | null = null;
      if (referralCode) {
        const { data: refProfile } = await supabase
          .from("profiles")
          .select("id")
          .eq("referral_code", referralCode)
          .single();

        if (refProfile) referrerId = refProfile.id;
      }

      // 4. Create profile
      await supabase.from("profiles").upsert({
        id:            user.id,
        name:          `${form.firstName} ${form.lastName}`,
        first_name:    form.firstName,
        last_name:     form.lastName,
        email:         form.email,
        country:       form.country,
        phone:         form.phone,
        referral_code: newReferralCode,
        referred_by:   referrerId,
      });

      // 5. Create wallets for all supported coins
      const walletRows = COINS.map((symbol) => ({
        user_id:    user.id,
        symbol,
        address:    generateHexAddress(),
        amount:     0,
        usd_value:  0,
        price:      symbol === "POLYC" ? 0.2 : 0,
        change_pct: 0,
      }));

      await supabase.from("wallets").insert(walletRows);

      // 6. Create referral record if referred by someone
      if (referrerId) {
        await supabase.from("referrals").insert({
          referrer_id: referrerId,
          referred_id: user.id,
          status:      "active",
          total_earned: 0,
        });

        // Also store in referral_codes table
        await supabase.from("referral_codes").insert({
          user_id: user.id,
          code:    newReferralCode,
        });
      } else {
        // Create referral code record regardless
        await supabase.from("referral_codes").insert({
          user_id: user.id,
          code:    newReferralCode,
        });
      }

    } catch (err) {
      console.error("Post-signup setup error:", err);
      // Don't block the user — account was created, setup can be retried
    }

    setLoading(false);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-[440px] bg-[#111118] border border-white/8 rounded-2xl p-8 md:p-10 shadow-2xl relative z-10">

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </div>

      <h1 className="text-2xl font-black text-center mb-1">Create account</h1>
      <p className="text-sm text-white/45 text-center mb-7">
        Join PlutoChain and start trading
        {referralCode && (
          <span className="block mt-1 text-[#FF7900] font-semibold">
            🎁 Referral code applied: {referralCode}
          </span>
        )}
      </p>

      {/* Error */}
      {error && (
        <div className="bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 text-[#ff6b82] rounded-lg px-4 py-3 text-sm font-medium mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
              First Name
            </label>
            <input
              className="field"
              placeholder="John"
              value={form.firstName}
              onChange={set("firstName")}
              autoComplete="given-name"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
              Last Name
            </label>
            <input
              className="field"
              placeholder="Doe"
              value={form.lastName}
              onChange={set("lastName")}
              autoComplete="family-name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Email
          </label>
          <input
            className="field"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Country
          </label>
          <input
            className="field"
            placeholder="Nigeria"
            value={form.country}
            onChange={set("country")}
            autoComplete="country-name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Phone <span className="text-white/25 normal-case font-normal">(optional)</span>
          </label>
          <input
            className="field"
            type="tel"
            placeholder="+234 800 000 0000"
            value={form.phone}
            onChange={set("phone")}
            autoComplete="tel"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
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

        {/* Confirm */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Confirm Password
          </label>
          <PasswordInput
            id="confirm"
            placeholder="Repeat password"
            value={form.confirm}
            onChange={set("confirm")}
          />
          {form.confirm && form.password !== form.confirm && (
            <p className="text-xs text-[#ff4d6a] mt-1.5">Passwords do not match</p>
          )}
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="accent-[#FF7900] w-4 h-4 mt-0.5 flex-shrink-0"
          />
          <span className="text-white/50 leading-relaxed">
            I agree to the{" "}
            <Link href="/terms" className="text-[#FF7900] hover:underline font-semibold">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#FF7900] hover:underline font-semibold">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Submit */}
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
        <Link href="/login" className="text-[#FF7900] font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}