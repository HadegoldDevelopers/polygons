"use client";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";

interface ReferralLinkCardProps {
  link: string;
}

export function ReferralLinkCard({ link }: ReferralLinkCardProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const copy = (): void => {
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    showToast("Referral link copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareButtons = [
    {
      label: "Twitter",
      icon: "🐦",
      url: `https://twitter.com/intent/tweet?text=Join%20PloycongiCapital%20and%20earn%20crypto!%20Use%20my%20referral%20link:%20${encodeURIComponent(link)}`,
    },
    {
      label: "Telegram",
      icon: "✈️",
      url: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=Join%20PlutoChain%20and%20earn%20crypto!`,
    },
    {
      label: "WhatsApp",
      icon: "💬",
      url: `https://wa.me/?text=Join%20PloycongiCapital%20and%20earn%20crypto!%20${encodeURIComponent(link)}`,
    },
  ];

  const handleShare = (url: string, label: string) => {
    // On mobile, use native share if available
    if (navigator.share && window.innerWidth < 768) {
      navigator.share({ title: "Ploycongi Capital Referral", url: link })
        .then(() => showToast("Shared successfully!", "success"))
        .catch(() => {});
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    showToast(`Shared to ${label}!`, "success");
  };

  return (
    <div className="card space-y-4 p-4 md:p-6">
      {/* Header */}
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
        Your Referral Link
      </p>

      {/* Link display — scrollable on mobile instead of breaking */}
      <div className="bg-[#1a1a24] border border-white/8 rounded-xl p-3 md:p-4">
        <p className="font-mono text-[11px] md:text-xs text-white/60 leading-relaxed break-all">
          {link}
        </p>
      </div>

      {/* Copy button — large touch target */}
      <button
        onClick={copy}
        className={`w-full py-3.5 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
          copied
            ? "border-[#00d4aa]/40 bg-[#00d4aa]/10 text-[#00d4aa]"
            : "border-[#FF7900]/35 bg-[#FF7900]/10 text-[#FF7900] hover:bg-[#FF7900]/20"
        }`}
      >
        {copied ? "✓ Copied!" : "📋 Copy Referral Link"}
      </button>

      {/* Share buttons — 3 col on all sizes, icon+label */}
      <div className="grid grid-cols-3 gap-2">
        {shareButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleShare(btn.url, btn.label)}
            className="btn-ghost py-2.5 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs active:scale-[0.97] transition-transform"
          >
            <span className="text-base sm:text-sm">{btn.icon}</span>
            <span className="text-[10px] sm:text-xs font-bold">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* How it works — compact on mobile */}
      <div className="pt-2 border-t border-white/8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
          How It Works
        </p>
        <div className="space-y-2.5">
          {[
            "Share your referral link with friends",
            "Friend signs up and starts trading",
            "You earn a % of their transaction fees — forever",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-[#FF7900] flex items-center justify-center text-[10px] md:text-xs font-black text-black flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}