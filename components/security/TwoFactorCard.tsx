"use client";

import { useToast } from "@/context/ToastContext";

export function TwoFactorCard() {
  const { showToast } = useToast();

  return (
    <div className="card">
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
        Two-Factor Authentication
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold mb-1">Authenticator App</p>
          <p className="text-xs text-white/40">
            Use Google Authenticator or Authy for extra security
          </p>
        </div>

        <button
          className="btn-ghost text-sm px-4 py-2"
          onClick={() => showToast("2FA setup flow coming soon", "info")}
        >
          Enable 2FA
        </button>
      </div>
    </div>
  );
}
