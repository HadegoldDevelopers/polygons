"use client";

import { useState, useEffect } from "react";
import type { AdminProfile } from "@/lib/admin/types";

type Props = {
  user: AdminProfile | null;
  open: boolean;
  onClose: () => void;
  onUpdated: (u: AdminProfile) => void;
};

export default function EditUserModal({ user, open, onClose, onUpdated }: Props) {
  const [profile, setProfile] = useState({
    name: "",
    country: "",
    phone: "",
    is_admin: false,
    is_banned: false,
    is_verified: false,
  });

  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAuth, setSavingAuth] = useState(false);

  // Initialize when modal opens
  useEffect(() => {
    if (!open || !user) return;

    setProfile({
      name: user.name ?? "",
      country: user.country ?? "",
      phone: user.phone ?? "",
      is_admin: user.is_admin ?? false,
      is_banned: user.is_banned ?? false,
      is_verified: user.is_verified ?? false,
    });

    setAuth({
      email: user.email,
      password: "",
    });
  }, [open, user]);

  if (!open || !user) return null;

  const saveProfile = async () => {
    setSavingProfile(true);

    const res = await fetch(`/api/admin/users/${user.id}/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    const json = await res.json();
    setSavingProfile(false);

    if (!json.error) {
      onUpdated(json.profile);
      onClose();
    }
  };

  const saveAuth = async () => {
    setSavingAuth(true);

    const res = await fetch(`/api/admin/users/${user.id}/auth`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auth),
    });

    const json = await res.json();
    setSavingAuth(false);

    if (!json.error) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111118] border border-white/10 rounded-2xl p-6 w-full max-w-lg space-y-6">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-black">Edit User</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">✕</button>
        </div>

        {/* PROFILE */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white/60">Profile Information</h3>

          <input className="field" placeholder="Name" value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })} />

          <input className="field" placeholder="Country" value={profile.country}
            onChange={(e) => setProfile({ ...profile, country: e.target.value })} />

          <input className="field" placeholder="Phone" value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />

          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={profile.is_admin}
                onChange={(e) => setProfile({ ...profile, is_admin: e.target.checked })} />
              Admin
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={profile.is_verified}
                onChange={(e) => setProfile({ ...profile, is_verified: e.target.checked })} />
              Verified
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={profile.is_banned}
                onChange={(e) => setProfile({ ...profile, is_banned: e.target.checked })} />
              Banned
            </label>
          </div>

          <button onClick={saveProfile}
            className="w-full py-2 bg-[#FF7900] text-black rounded-lg font-bold">
            {savingProfile ? "Saving..." : "Save Profile"}
          </button>
        </div>

        {/* AUTH */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-white/60">Authentication</h3>

          <input className="field" placeholder="Email" value={auth.email}
            onChange={(e) => setAuth({ ...auth, email: e.target.value })} />

          <input className="field" placeholder="New Password" type="password" value={auth.password}
            onChange={(e) => setAuth({ ...auth, password: e.target.value })} />

          <button onClick={saveAuth}
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-bold">
            {savingAuth ? "Saving..." : "Save Auth"}
          </button>
        </div>
      </div>
    </div>
  );
}
