"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";

interface ApiKey {
  id: string;
  key: string;
  status: "active" | "revoked";
}
export default function ApiKeysSettings() {
  const { showToast } = useToast();
  const [loadingPage, setLoading] = useState(true);
  const [keys, setKeys] = useState<ApiKey[]>([]);

  const load = async () => {
    const res = await fetch("/api/user/settings/api-keys");
    const data = await res.json();
    setKeys(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const generate = async () => {
    const res = await fetch("/api/user/settings/api-keys", { method: "POST" });
    const data = await res.json();

    if (!res.ok) return showToast(data.error, "error");

    showToast("New API key generated!", "success");
    load();
  };

  const revoke = async (id: string) => {
    const res = await fetch("/api/user/settings/api-keys", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (!res.ok) return showToast(data.error, "error");

    showToast("API key revoked", "success");
    load();
  };

  if (loadingPage) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
          <p className="text-sm text-white/40">Loading Api…</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-black mb-1">API Keys</h3>
      <p className="text-sm text-white/40 mb-6">Manage access keys for developers</p>

      {keys.map((k) => (
        <div key={k.id} className="bg-[#1a1a24] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold">Production Key</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#00d4aa]/10 text-[#00d4aa]">
              {k.status}
            </span>
          </div>

          <div className="bg-[#0a0a0f] border border-white/8 rounded-lg p-3 font-mono text-xs text-white/50 mb-3 break-all">
            {k.key.slice(0, 6)}••••••••••••••••••••••••{k.key.slice(-4)}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(k.key)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#22222e] border border-white/8 font-semibold hover:border-white/20"
            >
              Copy
            </button>

            <button
              onClick={() => revoke(k.id)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 text-[#ff4d6a] font-semibold"
            >
              Revoke
            </button>
          </div>
        </div>
      ))}

      <button className="btn-ghost" onClick={generate}>
        + Generate New Key
      </button>
    </div>
  );
}
