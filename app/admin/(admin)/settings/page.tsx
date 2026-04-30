"use client";

import { useEffect, useState } from "react";
import type { AdminSettings } from "@/lib/admin/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch("/api/admin/settings", { cache: "no-store" });
      const json = await res.json();
      setSettings(json.settings ?? null);
      setLoading(false);
    };
    load();
  }, []);

  const handleChange =
    (field: keyof AdminSettings) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSettings((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const json = await res.json();
    setSaving(false);
    if (json.error) return;
    setSettings(json.settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Settings</h1>
          <p className="text-xs text-white/50">
            Configure payment provider keys and global settings.
          </p>
        </div>
        {saved && (
          <span className="text-xs text-emerald-400 font-medium">
            Settings saved
          </span>
        )}
      </div>

      <div className="bg-[#0d0d14] border border-white/10 rounded-xl p-5 space-y-4 max-w-xl">
        {loading && (
          <p className="text-xs text-white/50">Loading settings...</p>
        )}

        {!loading && !settings && (
          <p className="text-xs text-white/50">
            No settings row found. Create one in the database.
          </p>
        )}

        {!loading && settings && (
          <>
            <div className="space-y-1">
              <label className="text-xs text-white/60">
                NOWPayments API Key
              </label>
              <input
                type="text"
                value={settings.now_api_key ?? ""}
                onChange={handleChange("now_api_key")}
                className="w-full bg-[#11111a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                placeholder="NOW_API_KEY"
              />
              <p className="text-[11px] text-white/40">
                Used for creating payment invoices.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/60">
                NOWPayments IPN Secret
              </label>
              <input
                type="text"
                value={settings.now_ipn_secret ?? ""}
                onChange={handleChange("now_ipn_secret")}
                className="w-full bg-[#11111a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                placeholder="NOW_IPN_SECRET"
              />
              <p className="text-[11px] text-white/40">
                Used to verify callbacks from NOWPayments.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/60">
                NOWPayments Public Key
              </label>
              <input
                type="text"
                value={settings.now_public_key ?? ""}
                onChange={handleChange("now_public_key")}
                className="w-full bg-[#11111a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                placeholder="NOW_PUBLIC_KEY"
              />
              <p className="text-[11px] text-white/40">
                Used on the client side if needed.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg text-xs bg-[#FF7900] text-black font-semibold hover:bg-[#ff9933] disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
