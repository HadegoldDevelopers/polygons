"use client";

import { useEffect, useState } from "react";
import type { AdminSettings } from "@/lib/admin/types";
import SettingsHeader from "@/components/admin/pages/settings/SettingsHeader";
import SettingsForm from "@/components/admin/pages/settings/SettingsForm";

export default function SettingsClient() {
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

  const updateField = (field: keyof AdminSettings, value: string) => {
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
      <SettingsHeader saved={saved} />

      {loading && (
        <p className="text-xs text-white/50">Loading settings...</p>
      )}

      {!loading && !settings && (
        <p className="text-xs text-white/50">
          No settings row found. Create one in the database.
        </p>
      )}

      {!loading && settings && (
        <SettingsForm
          settings={settings}
          onChange={updateField}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}
