"use client";
import { useState } from "react";

/* ── Logo ──────────────────────────────────────────────────────── */
import Image from "next/image";
import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const text = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
     <Link href="/">
    <div className="flex items-center gap-2.5">
     <Image
          src="/logo.jpg"
          alt="PolyCogni Logo"
          width={sizes[size]}
          height={sizes[size]}
          className="rounded-full object-cover"
      />
      <span className={`${text[size]} font-extrabold`}>
        POLYCOGNI<span className="text-[#FF7900]"> Capital</span>
      </span>
    </div>
     </Link>
  );
}

/* ── Password input ────────────────────────────────────────────── */
export function PasswordInput({ id, placeholder, value, onChange, className = "" }: { id: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; className?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`field pr-11 ${className}`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors text-base"
      >
        {show ? "🙈" : "👁"}
      </button>
    </div>
  );
}

/* ── Strength meter ────────────────────────────────────────────── */
export function StrengthMeter({ password }: { password: string }) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const colors = ["", "bg-[#ff4d6a]", "bg-yellow-400", "bg-[#00d4aa]", "bg-[#00d4aa]"];
  const names = ["", "Weak", "Fair", "Strong", "Very Strong"];
  const nameColors = ["", "text-[#ff4d6a]", "text-yellow-400", "text-[#00d4aa]", "text-[#00d4aa]"];

  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`strength-seg ${i <= score ? colors[score] : ""}`}
          />
        ))}
      </div>
      <p className={`text-[11px] mt-1 ${nameColors[score]}`}>{names[score]}</p>
    </div>
  );
}

/* ── Stat card ─────────────────────────────────────────────────── */
// components/ui/index.tsx (or wherever StatCard lives)

/* ── Stat card ─────────────────────────────────────────────────── */
type StatCardProps = {
  icon: string;
  value: React.ReactNode;
  label?: string;          // <─ add
  name?: string;           // existing
  change?: string;
  changeDir?: "up" | "down";
};

export function StatCard({ icon, value, label, name, change, changeDir }: StatCardProps) {
  const finalLabel = label ?? name ?? "";

  return (
    <div className="stat-card">
      <div className="w-11 h-11 rounded-xl bg-[var(--orange-dim)] flex items-center justify-center text-xl mb-4 relative z-10">
        {icon}
      </div>
      <div className="text-2xl font-black mb-1 relative z-10" style={{ letterSpacing: "-0.5px" }}>
        {value}
      </div>
      <div className="text-xs text-white/45 font-medium relative z-10">
        {finalLabel}
      </div>

      {change && (
        <div
          className={`inline-flex items-center gap-1 mt-2 text-[11px] font-bold px-2 py-0.5 rounded-full relative z-10 ${
            changeDir === "up"
              ? "bg-[#00d4aa]/10 text-[#00d4aa]"
              : "bg-[#ff4d6a]/10 text-[#ff4d6a]"
          }`}
        >
          {changeDir === "up" ? "▲" : "▼"} {change}
        </div>
      )}
    </div>
  );
}


/* ── Badge ─────────────────────────────────────────────────────── */
export function Badge({ status }: { status: "confirmed" | "pending" | "failed" }) {
  const styles = {
    confirmed: "bg-[#00d4aa]/10 text-[#00d4aa]",
    pending: "bg-yellow-400/10 text-yellow-400",
    failed: "bg-[#ff4d6a]/10 text-[#ff4d6a]",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${styles[status] || styles.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/* ── Toggle ────────────────────────────────────────────────────── */

interface ToggleProps {
  defaultOn?: boolean;
  onChange?: (value: boolean) => void;
}

export function Toggle({ defaultOn = false, onChange }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);

  const toggle = () => {
    const newVal = !on;
    setOn(newVal);
    if (onChange) onChange(newVal);
  };

  return (
    <button
      onClick={toggle}
      className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${
        on ? "bg-[#FF7900]" : "bg-white/10"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}


/* ── Section heading ───────────────────────────────────────────── */
export function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-[22px] font-black mb-1">{title}</h1>
      <p className="text-sm text-white/45">{subtitle}</p>
    </div>
  );
}
