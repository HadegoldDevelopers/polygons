"use client";
import { useState } from "react";
import { PageHeading, PasswordInput } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

export default function SecurityPage() {
  const { showToast } = useToast();
  const [pw, setPw] = useState({ current:"", newPw:"", confirm:"" });

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!pw.current || !pw.newPw || !pw.confirm) { showToast("Please fill in all fields", "error"); return; }
    if (pw.newPw !== pw.confirm) { showToast("New passwords do not match", "error"); return; }
    if (pw.newPw.length < 8) { showToast("Password must be at least 8 characters", "error"); return; }
    showToast("Password updated successfully!", "success");
    setPw({ current:"", newPw:"", confirm:"" });
  };

  const sessions = [
    { device:"Chrome — MacOS",  location:"Lagos, Nigeria",     time:"Current session",  current:true  },
    { device:"Mobile App — iOS",location:"Lagos, Nigeria",     time:"2 hours ago",      current:false },
    { device:"Firefox — Windows",location:"London, UK",        time:"5 days ago",       current:false },
  ];

  return (
    <div>
      <PageHeading title="Security 🔒" subtitle="Protect your account and assets." />

      <div className="max-w-[560px] space-y-5">
        {/* 2FA */}
        <div className="card">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">Two-Factor Authentication</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold mb-1">Authenticator App</p>
              <p className="text-xs text-white/40">Use Google Authenticator or Authy for extra security</p>
            </div>
            <button className="btn-ghost text-sm px-4 py-2" onClick={() => showToast("2FA setup flow coming soon", "info")}>
              Enable 2FA
            </button>
          </div>
        </div>

        {/* Change password */}
        <div className="card">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">Change Password</p>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Current Password</label>
              <PasswordInput placeholder="••••••••" value={pw.current} onChange={(e) => setPw((p) => ({ ...p, current: e.target.value }))} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">New Password</label>
              <PasswordInput placeholder="••••••••" value={pw.newPw} onChange={(e) => setPw((p) => ({ ...p, newPw: e.target.value }))} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Confirm New Password</label>
              <PasswordInput placeholder="••••••••" value={pw.confirm} onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))} />
            </div>
            <button type="submit" className="btn-primary max-w-[180px]">Update Password</button>
          </form>
        </div>

        {/* Active sessions */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Active Sessions</p>
            <button onClick={() => showToast("All other sessions terminated", "success")} className="text-xs text-[#ff4d6a] font-bold hover:underline">
              Revoke All Others
            </button>
          </div>
          <div className="divide-y divide-white/8">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${s.current ? "bg-[#00d4aa]/10" : "bg-[#FF7900]/10"}`}>
                  {s.device.includes("Mobile") ? "📱" : "💻"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{s.device}</p>
                  <p className="text-xs text-white/40">{s.location} · {s.time}</p>
                </div>
                {s.current ? (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#00d4aa]/10 text-[#00d4aa]">Current</span>
                ) : (
                  <button
                    onClick={() => showToast("Session terminated", "error")}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 text-[#ff4d6a] font-semibold"
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
