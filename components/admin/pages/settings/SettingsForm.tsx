"use client";

import SettingsField from "./SettingsField";
import type { AdminSettings } from "@/lib/admin/types";

interface Props {
  settings: AdminSettings;
  onChange: (field: keyof AdminSettings, value: string) => void;
  onSave: () => void;
  saving: boolean;
}

export default function SettingsForm({ settings, onChange, onSave, saving }: Props) {
  return (
    <div className="bg-[#0d0d14] border border-white/10 rounded-xl p-5 space-y-4 max-w-xl">
      <SettingsField
        label="NOWPayments API Key"
        value={settings.now_api_key ?? ""}
        placeholder="NOW_API_KEY"
        description="Used for creating payment invoices."
        onChange={(v) => onChange("now_api_key", v)}
      />

      <SettingsField
        label="NOWPayments IPN Secret"
        value={settings.now_ipn_secret ?? ""}
        placeholder="NOW_IPN_SECRET"
        description="Used to verify callbacks from NOWPayments."
        onChange={(v) => onChange("now_ipn_secret", v)}
      />

      <SettingsField
        label="NOWPayments Public Key"
        value={settings.now_public_key ?? ""}
        placeholder="NOW_PUBLIC_KEY"
        description="Used on the client side if needed."
        onChange={(v) => onChange("now_public_key", v)}
      />

      <div className="flex justify-end pt-2">
        <button
          onClick={onSave}
          disabled={saving}
          className="px-4 py-2 rounded-lg text-xs bg-[#FF7900] text-black font-semibold hover:bg-[#ff9933] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
