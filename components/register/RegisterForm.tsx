"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";
import { countries } from "@/lib/data/countries";
import { Logo, PasswordInput, StrengthMeter } from "@/components/ui";
import { useTranslations, useLocale } from "next-intl";

export default function RegisterForm() {
  const t = useTranslations("register");
  const locale = useLocale();

  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");

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
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError(t("fillAllFields"));
      return;
    }
    if (form.password !== form.confirm) {
      setError(t("passwordsNoMatch"));
      return;
    }
    if (form.password.length < 8) {
      setError(t("passwordMin"));
      return;
    }
    if (!terms) {
      setError(t("acceptTerms"));
      return;
    }

    setLoading(true);

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
      setError(t("signupFailed"));
      setLoading(false);
      return;
    }

    await fetch("/api/user/auth/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        email: form.email,
        first_name: form.firstName,
        last_name: form.lastName,
        country: form.country,
        phone: form.phone,
        referral_code_used: referralCode ?? null,
      }),
    });

    setLoading(false);
    router.push(`/${locale}/dashboard`);
  }

  useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data?.country_name) {
          setForm((f) => ({ ...f, country: data.country_name }));
        }
      } catch (e) {
        console.log("Country detection failed");
      }
    }

    detectCountry();
  }, []);

  return (
    <div className="w-full max-w-[440px] bg-[#111118] border border-white/8 rounded-2xl p-10 shadow-2xl relative z-10">
      <div className="flex justify-center mb-8">
        <Logo size="md" />
      </div>

      <h1 className="text-2xl font-black text-center mb-1">
        {t("createAccount")}
      </h1>

      <p className="text-sm text-white/45 text-center mb-7">
        {t("subtitle")}
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
              {t("firstName")}
            </label>
            <input
              type="text"
              className="field"
              placeholder={t("firstNamePlaceholder")}
              value={form.firstName}
              onChange={set("firstName")}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
              {t("lastName")}
            </label>
            <input
              type="text"
              className="field"
              placeholder={t("lastNamePlaceholder")}
              value={form.lastName}
              onChange={set("lastName")}
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            {t("email")}
          </label>
          <input
            type="email"
            className="field"
            placeholder={t("emailPlaceholder")}
            value={form.email}
            onChange={set("email")}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            {t("country")}
          </label>

          <select className="field" value={form.country} onChange={set("country")}>
            <option value="">{t("selectCountry")}</option>
            {countries.map((c) => (
              <option key={c.code} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            {t("phone")}
          </label>
          <input
            type="number"
            className="field"
            placeholder={t("phonePlaceholder")}
            value={form.phone}
            onChange={set("phone")}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            {t("password")}
          </label>
          <PasswordInput
            id="password"
            placeholder={t("passwordPlaceholder")}
            value={form.password}
            onChange={set("password")}
          />
          <StrengthMeter password={form.password} />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/45 mb-2">
            {t("confirmPassword")}
          </label>
          <PasswordInput
            id="confirm"
            placeholder={t("confirmPasswordPlaceholder")}
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
            {t("agreeTo")}{" "}
            <Link href={`/${locale}/aml-kyc`} className="text-[#FF7900]">
              {t("termsOfService")}
            </Link>{" "}
            {t("and")}{" "}
            <Link href={`/${locale}/privacy`} className="text-[#FF7900]">
              {t("privacyPolicy")}
            </Link>
          </span>
        </label>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            t("createAccountBtn")
          )}
        </button>
      </form>

      <p className="text-center text-sm text-white/45 mt-6">
        {t("alreadyHaveAccount")}{" "}
        <Link
          href={`/${locale}/login`}
          className="text-[#FF7900] font-semibold hover:underline"
        >
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
