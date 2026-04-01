"use client";
import { useState } from "react";
import { PageHeading, Toggle } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

const menuItems = [
  { id: "profile",       label: "👤 Profile"       },
  { id: "preferences",   label: "🎨 Preferences"   },
  { id: "notifications", label: "🔔 Notifications" },
  { id: "api",           label: "🔑 API Keys"      },
];

export default function SettingsPage() {
  const { showToast } = useToast();
  const [tab, setTab] = useState("profile");
  const [form, setForm] = useState({ firstName:"John", lastName:"Doe", email:"demo@plutochain.io", phone:"+234 800 000 0000", country:"Nigeria" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div>
      <PageHeading title="Settings" subtitle="Manage your account preferences." />

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Sidebar menu */}
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

        {/* Content */}
        <div className="card">
          {/* Profile */}
          {tab === "profile" && (
            <div>
              <h3 className="text-lg font-black mb-1">Profile</h3>
              <p className="text-sm text-white/40 mb-6">Update your personal information</p>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7900] to-[#ff4d6a] flex items-center justify-center text-2xl font-black text-black flex-shrink-0">
                  JD
                </div>
                <div>
                  <p className="font-bold mb-0.5">{form.firstName} {form.lastName}</p>
                  <p className="text-sm text-white/40 mb-2">{form.email}</p>
                  <button
                    onClick={() => showToast("Upload feature coming soon", "info")}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#1a1a24] border border-white/8 font-semibold hover:border-[#FF7900]/35 transition-colors"
                  >
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">First Name</label>
                    <input type="text" className="field" value={form.firstName} onChange={set("firstName")} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Last Name</label>
                    <input type="text" className="field" value={form.lastName} onChange={set("lastName")} />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Email</label>
                  <input type="email" className="field" value={form.email} onChange={set("email")} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Phone</label>
                  <input type="tel" className="field" value={form.phone} onChange={set("phone")} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Country</label>
                  <select className="field cursor-pointer" value={form.country} onChange={set("country")}>
                    {["Nigeria","United States","United Kingdom","Germany","Canada","Australia"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <button className="btn-primary max-w-[180px]" onClick={() => showToast("Profile saved!", "success")}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Preferences */}
          {tab === "preferences" && (
            <div>
              <h3 className="text-lg font-black mb-1">Preferences</h3>
              <p className="text-sm text-white/40 mb-6">Customize your experience</p>
              <div className="divide-y divide-white/8">
                {[
                  { label:"Dark Mode",      desc:"Always use dark theme",                      on:true  },
                  { label:"Price Alerts",   desc:"Get notified when PLUTO changes 5%+",        on:true  },
                  { label:"Auto Compound",  desc:"Automatically reinvest staking rewards",     on:false },
                  { label:"Compact View",   desc:"Show more data with reduced spacing",        on:false },
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
              <div className="mt-5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Display Currency</label>
                <select className="field max-w-[240px] cursor-pointer">
                  <option>USD — US Dollar</option>
                  <option>EUR — Euro</option>
                  <option>GBP — British Pound</option>
                  <option>NGN — Nigerian Naira</option>
                </select>
              </div>
              <button className="btn-primary max-w-[140px] mt-5" onClick={() => showToast("Preferences saved!", "success")}>Save</button>
            </div>
          )}

          {/* Notifications */}
          {tab === "notifications" && (
            <div>
              <h3 className="text-lg font-black mb-1">Notifications</h3>
              <p className="text-sm text-white/40 mb-6">Choose what you're notified about</p>
              <div className="divide-y divide-white/8">
                {[
                  { label:"Deposits",        desc:"When funds arrive in your wallet",              on:true  },
                  { label:"Withdrawals",     desc:"Confirmation of outgoing transfers",            on:true  },
                  { label:"Staking Rewards", desc:"Daily reward notifications",                   on:true  },
                  { label:"Price Alerts",    desc:"PLUTO price movement alerts",                  on:false },
                  { label:"Security Alerts", desc:"New device logins, suspicious activity",       on:true  },
                  { label:"Newsletter",      desc:"PlutoChain updates and news",                  on:false },
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
              <button className="btn-primary max-w-[140px] mt-5" onClick={() => showToast("Notification settings saved!", "success")}>Save</button>
            </div>
          )}

          {/* API Keys */}
          {tab === "api" && (
            <div>
              <h3 className="text-lg font-black mb-1">API Keys</h3>
              <p className="text-sm text-white/40 mb-6">Manage access keys for developers</p>
              <div className="bg-[#1a1a24] rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold">Production Key</p>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#00d4aa]/10 text-[#00d4aa]">Active</span>
                </div>
                <div className="bg-[#0a0a0f] border border-white/8 rounded-lg p-3 font-mono text-xs text-white/50 mb-3 break-all">
                  pluto_live_sk_••••••••••••••••••••••••4f2a
                </div>
                <div className="flex gap-2">
                  <button onClick={() => showToast("Key revealed", "info")} className="text-xs px-3 py-1.5 rounded-lg bg-[#22222e] border border-white/8 font-semibold hover:border-white/20 transition-colors">Reveal</button>
                  <button onClick={() => showToast("Key revoked", "error")} className="text-xs px-3 py-1.5 rounded-lg bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 text-[#ff4d6a] font-semibold">Revoke</button>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => showToast("New API key generated!", "success")}>
                + Generate New Key
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
