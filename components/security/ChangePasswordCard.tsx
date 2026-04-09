"use client";

import { useState } from "react";
import { PasswordInput } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

export function ChangePasswordCard() {
  const { showToast } = useToast();

  const [pw, setPw] = useState({
    current: "",
    newPw: "",
    confirm: "",
  });

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!pw.current || !pw.newPw || !pw.confirm) {
      showToast("Please fill in all fields", "error");
      return;
    }

    if (pw.newPw !== pw.confirm) {
      showToast("New passwords do not match", "error");
      return;
    }

    if (pw.newPw.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }

    // API CALL — this is the correct place
    const res = await fetch("/api/security/change-password", {
      method: "POST",
      body: JSON.stringify({
        current: pw.current,
        newPw: pw.newPw,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error, "error");
      return;
    }

    showToast("Password updated successfully!", "success");

    // Reset fields
    setPw({ current: "", newPw: "", confirm: "" });
  };

  return (
    <div className="card">
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
        Change Password
      </p>

      <form onSubmit={handlePasswordChange} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Current Password
          </label>
          <PasswordInput
            id="current-password"
            placeholder="••••••••"
            value={pw.current}
            onChange={(e) =>
              setPw((p) => ({ ...p, current: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            New Password
          </label>
          <PasswordInput
            id="new-password"
            placeholder="••••••••"
            value={pw.newPw}
            onChange={(e) =>
              setPw((p) => ({ ...p, newPw: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Confirm New Password
          </label>
          <PasswordInput
            id="confirm-password"
            placeholder="••••••••"
            value={pw.confirm}
            onChange={(e) =>
              setPw((p) => ({ ...p, confirm: e.target.value }))
            }
          />
        </div>

        <button type="submit" className="btn-primary max-w-[180px]">
          Update Password
        </button>
      </form>
    </div>
  );
}
