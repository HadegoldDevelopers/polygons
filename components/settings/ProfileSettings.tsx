"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";

export default function ProfileSettings() {
  const { showToast } = useToast();
  const [loadingPage, setLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  });

  const set =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/user/settings/profile");
      const data = await res.json();

      setForm({
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        country: data.country ?? "Nigeria",
      });

      setLoading(false);
    };
    load();
  }, []);

  const save = async () => {
    const res = await fetch("/api/user/settings/profile", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return showToast(data.error, "error");

    showToast("Profile saved!", "success");
  };

  if (loadingPage) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
          <p className="text-sm text-white/40">Loading profile…</p>
        </div>
      </div>
    );
  }

  const initials = `${form.firstName?.[0] ?? ""}${form.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div>
      <h3 className="text-lg font-black mb-1">Profile</h3>
      <p className="text-sm text-white/40 mb-6">Update your personal information</p>

      {/* Avatar block (restored) */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF7900] to-[#ff4d6a] flex items-center justify-center text-2xl font-black text-black flex-shrink-0">
          {initials || "?"}
        </div>
        <div>
          <p className="font-bold mb-0.5">
            {form.firstName} {form.lastName}
          </p>
          <p className="text-sm text-white/40 mb-2">{form.email}</p>
          <button
            onClick={() => showToast("Upload feature coming soon", "info")}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#1a1a24] border border-white/8 font-semibold hover:border-[#FF7900]/35 transition-colors"
          >
            Change Photo
          </button>
        </div>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
              First Name
            </label>
            <input type="text" className="field" value={form.firstName} onChange={set("firstName")} />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
              Last Name
            </label>
            <input type="text" className="field" value={form.lastName} onChange={set("lastName")} />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Email
          </label>
          <input type="email" className="field" value={form.email} onChange={set("email")} />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Phone
          </label>
          <input type="tel" className="field" value={form.phone} onChange={set("phone")} />
        </div>

        <div>
  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
    Country
  </label>
  <input
    type="text"
    className="field"
    value={form.country}
    onChange={set("country")}
    placeholder="Enter your country"
  />
</div>
{/* <div>
          <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
            Country
          </label>
          <select className="field cursor-pointer" value={form.country} onChange={set("country")}>
            {["Nigeria", "United States", "United Kingdom", "Germany", "Canada", "Australia"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div> */}

        <button className="btn-primary max-w-[180px]" onClick={save}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
