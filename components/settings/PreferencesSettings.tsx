"use client";

import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

export default function PreferencesSettings() {
  const { showToast } = useToast();
  const [loadingPage, setLoading] = useState(true);

  const [prefs, setPrefs] = useState({
    dark_mode: true,
    price_alerts: true,
    auto_compound: false,
    compact_view: false,
  });

  const toggle = (key: string) => (val: boolean) =>
    setPrefs((p) => ({ ...p, [key]: val }));

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/user/settings/preferences");
      const data = await res.json();
      if (!data) {
  setPrefs({
    dark_mode: true,
    price_alerts: true,
    auto_compound: false,
    compact_view: false,
  });
} else {
  setPrefs(data);
}
      setLoading(false);
    };
    load();
  }, []);

  const save = async () => {
    const res = await fetch("/api/user/settings/preferences", {
      method: "POST",
      body: JSON.stringify(prefs),
    });

    const data = await res.json();
    if (!res.ok) return showToast(data.error, "error");

    showToast("Preferences saved!", "success");
  };

  if (loadingPage) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
          <p className="text-sm text-white/40">Loading preferences…</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h3 className="text-lg font-black mb-1">Preferences</h3>
      <p className="text-sm text-white/40 mb-6">Customize your experience</p>

      <div className="divide-y divide-white/8">
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold">Dark Mode</p>
            <p className="text-xs text-white/40">Always use dark theme</p>
          </div>
          <Toggle defaultOn={prefs.dark_mode} onChange={toggle("dark_mode")} />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold">Price Alerts</p>
            <p className="text-xs text-white/40">Get notified when POLYC changes 5%+</p>
          </div>
          <Toggle defaultOn={prefs.price_alerts} onChange={toggle("price_alerts")} />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold">Auto Compound</p>
            <p className="text-xs text-white/40">Automatically reinvest staking rewards</p>
          </div>
          <Toggle defaultOn={prefs.auto_compound} onChange={toggle("auto_compound")} />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold">Compact View</p>
            <p className="text-xs text-white/40">Show more data with reduced spacing</p>
          </div>
          <Toggle defaultOn={prefs.compact_view} onChange={toggle("compact_view")} />
        </div>
      </div>

      <button className="btn-primary max-w-[140px] mt-5" onClick={save}>
        Save
      </button>
    </div>
  );
}
