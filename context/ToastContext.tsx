"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

const ToastContext = createContext<{ showToast: (msg: string, type?: Toast["type"]) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const icons = { success: "✓", error: "✕", info: "ℹ" };
  const borders = {
    success: "border-l-[#00d4aa]",
    error: "border-l-[#ff4d6a]",
    info: "border-l-[#FF7900]",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-6 right-6 z-999 flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 min-w-70 max-w-90 bg-[#111118] border border-white/10 border-l-4 ${borders[t.type]} rounded-xl px-4 py-3 shadow-2xl toast-enter`}
          >
            <span className="text-lg">{icons[t.type]}</span>
            <span className="text-sm font-semibold flex-1">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}

