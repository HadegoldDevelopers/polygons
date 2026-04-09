"use client";

import { useToast } from "@/context/ToastContext";

export interface SessionItem {
  device: string;
  location: string;
  time: string;
  current: boolean;
}

export interface Props {
  sessions: SessionItem[];
  reload: () => Promise<void>;
}

export function ActiveSessionsCard({ sessions }: Props) {
  const { showToast } = useToast();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
          Active Sessions
        </p>

        <button
          onClick={() => showToast("All other sessions terminated", "success")}
          className="text-xs text-[#ff4d6a] font-bold hover:underline"
        >
          Revoke All Others
        </button>
      </div>

      <div className="divide-y divide-white/8">
        {sessions.map((s, i) => (
          <div key={i} className="flex items-center gap-3 py-3.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${
                s.current ? "bg-[#00d4aa]/10" : "bg-[#FF7900]/10"
              }`}
            >
              {s.device.includes("Mobile") ? "📱" : "💻"}
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold">{s.device}</p>
              <p className="text-xs text-white/40">
                {s.location} · {s.time}
              </p>
            </div>

            {s.current ? (
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#00d4aa]/10 text-[#00d4aa]">
                Current
              </span>
            ) : (
              <button
                onClick={() => showToast("Session terminated", "error")}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#ff4d6a]/10 border border-[#ff4d6a]/30 text-[#ff4d6a] font-semibold"
              >
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
