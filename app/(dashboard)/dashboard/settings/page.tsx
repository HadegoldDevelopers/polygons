"use client";

import { useEffect, useState, useRef } from "react";
import { PageHeading, Toggle } from "@/components/ui";
import { useToast } from "@/context/ToastContext";
import { supabase } from "@/lib/supabase/supabaseClient";

// ── Types ──────────────────────────────────────────────────────────
interface Profile {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  avatar_url: string | null;
  display_currency: string;
}

interface NotifPrefs {
  deposits: boolean;
  withdrawals: boolean;
  staking_rewards: boolean;
  price_alerts: boolean;
  security_alerts: boolean;
  newsletter: boolean;
}

const DEFAULT_NOTIF_PREFS: NotifPrefs = {
  deposits:        true,
  withdrawals:     true,
  staking_rewards: true,
  price_alerts:    false,
  security_alerts: true,
  newsletter:      false,
};

const CURRENCIES = ["USD", "EUR", "GBP", "NGN", "CAD", "AUD"];
const COUNTRIES  = [
  "Nigeria", "United States", "United Kingdom",
  "Germany", "Canada", "Australia", "France",
  "South Africa", "Kenya", "Ghana",
];

const menuItems = [
  { id: "profile",       label: "👤 Profile"       },
  { id: "preferences",   label: "🎨 Preferences"   },
  { id: "notifications", label: "🔔 Notifications" },
  { id: "security",      label: "🔒 Security"      },
];

// ── Component ──────────────────────────────────────────────────────
export default function SettingsPage() {
  const { showToast } = useToast();
  const [tab,     setTab]     = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  // Profile state
  const [profile, setProfile] = useState<Profile>({
    id: "", name: "", first_name: "", last_name: "",
    email: "", phone: "", country: "", avatar_url: null,
    display_currency: "USD",
  });

  // Notification preferences state
  const [notifPrefs,    setNotifPrefs]    = useState<NotifPrefs>(DEFAULT_NOTIF_PREFS);
  const [notifPrefId,   setNotifPrefId]   = useState<string | null>(null);

  // Password change state
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });

  // Avatar upload
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // ── Load profile + notification prefs ─────────────────────────
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, notifRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("notification_preferences").select("*").eq("user_id", user.id).single(),
      ]);

      if (profileRes.data) {
        const p = profileRes.data;
        // Support both combined `name` and split first/last
        const nameParts = (p.name ?? "").split(" ");
        setProfile({
          id:               p.id,
          name:             p.name ?? "",
          first_name:       p.first_name ?? nameParts[0] ?? "",
          last_name:        p.last_name  ?? nameParts.slice(1).join(" ") ?? "",
          email:            p.email ?? user.email ?? "",
          phone:            p.phone ?? "",
          country:          p.country ?? "",
          avatar_url:       p.avatar_url ?? null,
          display_currency: p.display_currency ?? "USD",
        });
      }

      if (notifRes.data) {
        const n = notifRes.data;
        setNotifPrefId(n.id);
        setNotifPrefs({
          deposits:        n.deposits        ?? true,
          withdrawals:     n.withdrawals     ?? true,
          staking_rewards: n.staking_rewards ?? true,
          price_alerts:    n.price_alerts    ?? false,
          security_alerts: n.security_alerts ?? true,
          newsletter:      n.newsletter      ?? false,
        });
      }

      setLoading(false);
    };
    load();
  }, []);

  // ── Save profile ───────────────────────────────────────────────
  const saveProfile = async () => {
    setSaving(true);
    const fullName = `${profile.first_name} ${profile.last_name}`.trim();

    const { error } = await supabase
      .from("profiles")
      .update({
        name:             fullName,
        first_name:       profile.first_name,
        last_name:        profile.last_name,
        phone:            profile.phone,
        country:          profile.country,
        display_currency: profile.display_currency,
        updated_at:       new Date().toISOString(),
      })
      .eq("id", profile.id);

    setSaving(false);
    if (error) { showToast("Failed to save profile", "error"); return; }
    showToast("Profile saved! ✓", "success");
  };

  // ── Save notification preferences ─────────────────────────────
  const saveNotifPrefs = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const payload = { ...notifPrefs, user_id: user.id, updated_at: new Date().toISOString() };

    let error;
    if (notifPrefId) {
      // Update existing
      ({ error } = await supabase
        .from("notification_preferences")
        .update(payload)
        .eq("id", notifPrefId));
    } else {
      // Create new row
      const res = await supabase
        .from("notification_preferences")
        .insert(payload)
        .select()
        .single();
      error = res.error;
      if (res.data) setNotifPrefId(res.data.id);
    }

    setSaving(false);
    if (error) { showToast("Failed to save notifications", "error"); return; }
    showToast("Notification settings saved! ✓", "success");
  };

  // ── Change password ────────────────────────────────────────────
  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwForm.current) { showToast("Enter current password", "error"); return; }
    if (!pwForm.newPw)   { showToast("Enter new password", "error"); return; }
    if (pwForm.newPw !== pwForm.confirm) { showToast("Passwords do not match", "error"); return; }
    if (pwForm.newPw.length < 8)         { showToast("Password must be at least 8 characters", "error"); return; }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: pwForm.newPw });
    setSaving(false);

    if (error) { showToast(error.message, "error"); return; }
    showToast("Password updated! ✓", "success");
    setPwForm({ current: "", newPw: "", confirm: "" });
  };

  // ── Upload avatar ──────────────────────────────────────────────
  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile.id) return;

    setAvatarUploading(true);
    const ext  = file.name.split(".").pop();
    const path = `${profile.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      showToast("Upload failed", "error");
      setAvatarUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(path);

    await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", profile.id);
    setProfile((p) => ({ ...p, avatar_url: publicUrl }));
    setAvatarUploading(false);
    showToast("Avatar updated! ✓", "success");
  };

  // ── Helpers ────────────────────────────────────────────────────
  const setP = (key: keyof Profile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setProfile((p) => ({ ...p, [key]: e.target.value }));

  const initials = `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase() || "??";

  // ── Loading skeleton ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 animate-pulse">
        <div className="h-48 bg-white/6 rounded-2xl" />
        <div className="h-96 bg-white/6 rounded-2xl" />
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div>
      <PageHeading title="Settings" subtitle="Manage your account preferences." />

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">

        {/* ── Tab menu ──────────────────────────────────────────── */}
        <div className="card p-2 h-fit">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all mb-1 last:mb-0 ${
                tab === item.id
                  ? "bg-[#FF7900]/15 text-[#FF7900]"
                  : "text-white/50 hover:bg-white/4 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* ── Content ───────────────────────────────────────────── */}
        <div className="card">

          {/* ── Profile tab ─────────────────────────────────────── */}
          {tab === "profile" && (
            <div>
              <h3 className="text-lg font-black mb-1">Profile</h3>
              <p className="text-sm text-white/40 mb-6">Update your personal information</p>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-shrink-0">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7900] to-[#ff4d6a] flex items-center justify-center text-2xl font-black text-black">
                      {initials}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold mb-0.5">{profile.first_name} {profile.last_name}</p>
                  <p className="text-sm text-white/40 mb-2">{profile.email}</p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={uploadAvatar}
                  />
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={avatarUploading}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#1a1a24] border border-white/8 font-semibold hover:border-[#FF7900]/35 transition-colors disabled:opacity-50"
                  >
                    {avatarUploading ? "Uploading…" : "Change Photo"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                      First Name
                    </label>
                    <input type="text" className="field" value={profile.first_name} onChange={setP("first_name")} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                      Last Name
                    </label>
                    <input type="text" className="field" value={profile.last_name} onChange={setP("last_name")} />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="field opacity-60 cursor-not-allowed"
                    value={profile.email}
                    readOnly
                    title="Email cannot be changed here"
                  />
                  <p className="text-[11px] text-white/30 mt-1">
                    Email is managed through your auth settings
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    Phone
                  </label>
                  <input type="tel" className="field" value={profile.phone} onChange={setP("phone")} placeholder="+1 234 567 8900" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    Country
                  </label>
                  <select className="field cursor-pointer" value={profile.country} onChange={setP("country")}>
                    <option value="">— Select country —</option>
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    Display Currency
                  </label>
                  <select className="field cursor-pointer max-w-[240px]" value={profile.display_currency} onChange={setP("display_currency")}>
                    {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <button
                  className="btn-primary max-w-[180px]"
                  onClick={saveProfile}
                  disabled={saving}
                >
                  {saving ? (
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── Preferences tab ─────────────────────────────────── */}
          {tab === "preferences" && (
            <div>
              <h3 className="text-lg font-black mb-1">Preferences</h3>
              <p className="text-sm text-white/40 mb-6">Customize your experience</p>

              <div className="divide-y divide-white/8 mb-6">
                {[
                  { label: "Dark Mode",     desc: "Always use dark theme",                  key: null,  on: true  },
                  { label: "Compact View",  desc: "Show more data with reduced spacing",    key: null,  on: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-bold">{item.label}</p>
                      <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle defaultOn={item.on} />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                  Display Currency
                </label>
                <select
                  className="field max-w-[240px] cursor-pointer"
                  value={profile.display_currency}
                  onChange={setP("display_currency")}
                >
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <button
                className="btn-primary max-w-[140px] mt-5"
                onClick={saveProfile}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          )}

          {/* ── Notifications tab ────────────────────────────────── */}
          {tab === "notifications" && (
            <div>
              <h3 className="text-lg font-black mb-1">Notifications</h3>
              <p className="text-sm text-white/40 mb-6">Choose what you're notified about</p>

              <div className="divide-y divide-white/8">
                {(
                  [
                    { key: "deposits",        label: "Deposits",        desc: "When funds arrive in your wallet"            },
                    { key: "withdrawals",     label: "Withdrawals",     desc: "Confirmation of outgoing transfers"          },
                    { key: "staking_rewards", label: "Staking Rewards", desc: "Daily reward notifications"                  },
                    { key: "price_alerts",    label: "Price Alerts",    desc: "PLUTO price movement alerts"                 },
                    { key: "security_alerts", label: "Security Alerts", desc: "New device logins, suspicious activity"      },
                    { key: "newsletter",      label: "Newsletter",      desc: "PlutoChain updates and news"                 },
                  ] as { key: keyof NotifPrefs; label: string; desc: string }[]
                ).map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-bold">{item.label}</p>
                      <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                    </div>
                    {/* <Toggle
                      defaultOn={notifPrefs[item.key]}
                      onChange={(val) =>
                        setNotifPrefs((prev) => ({ ...prev, [item.key]: val }))
                      }
                    /> */}
                  </div>
                ))}
              </div>

              <button
                className="btn-primary max-w-[140px] mt-5"
                onClick={saveNotifPrefs}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          )}

          {/* ── Security tab ─────────────────────────────────────── */}
          {tab === "security" && (
            <div>
              <h3 className="text-lg font-black mb-1">Security</h3>
              <p className="text-sm text-white/40 mb-6">Manage your account security</p>

              <form onSubmit={changePassword} className="space-y-4 max-w-[420px]">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="field"
                    placeholder="••••••••"
                    value={pwForm.current}
                    onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="field"
                    placeholder="Min. 8 characters"
                    value={pwForm.newPw}
                    onChange={(e) => setPwForm((p) => ({ ...p, newPw: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="field"
                    placeholder="Repeat new password"
                    value={pwForm.confirm}
                    onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))}
                  />
                  {/* Mismatch warning */}
                  {pwForm.confirm && pwForm.newPw !== pwForm.confirm && (
                    <p className="text-xs text-[#ff4d6a] mt-1.5">Passwords do not match</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary max-w-[200px]"
                  disabled={saving || (!!pwForm.confirm && pwForm.newPw !== pwForm.confirm)}
                >
                  {saving ? (
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>

              {/* Sign out all devices */}
              <div className="mt-8 pt-6 border-t border-white/8">
                <h4 className="text-sm font-bold mb-1">Sign Out Everywhere</h4>
                <p className="text-xs text-white/40 mb-3">
                  Sign out of all sessions on all devices
                </p>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut({ scope: "global" });
                    showToast("Signed out of all devices", "success");
                    window.location.href = "/login";
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold border border-[#ff4d6a]/30 bg-[#ff4d6a]/8 text-[#ff4d6a] hover:bg-[#ff4d6a]/15 transition-colors"
                >
                  Sign Out All Devices
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}