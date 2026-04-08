"use client";

import { useState } from "react";
import { PageHeading } from "@/components/ui";
import ProfileSettings from "@/components/settings/ProfileSettings";
import PreferencesSettings from "@/components/settings/PreferencesSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import ApiKeysSettings from "@/components/settings/ApiKeysSettings";

const menuItems = [
  { id: "profile", label: "👤 Profile" },
  { id: "preferences", label: "🎨 Preferences" },
  { id: "notifications", label: "🔔 Notifications" },
  { id: "api", label: "🔑 API Keys" },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");

  return (
    <div>
      <PageHeading title="Settings" subtitle="Manage your account preferences." />

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Sidebar */}
        <div className="card p-2 h-fit">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold mb-1 ${
                tab === item.id
                  ? "bg-[#FF7900]/15 text-[#FF7900]"
                  : "text-white/50 hover:bg-white/4 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card">
          {tab === "profile" && <ProfileSettings />}
          {tab === "preferences" && <PreferencesSettings />}
          {tab === "notifications" && <NotificationSettings />}
          {tab === "api" && <ApiKeysSettings />}
        </div>
      </div>
    </div>
  );
}
