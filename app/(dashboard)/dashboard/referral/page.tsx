"use client";
import { PageHeading, StatCard } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

const referralLink = "https://app.plutochain.io/register?ref=JDOE2024";

const referrals = [
  { name:"Alice M.",  joined:"Mar 10, 2024", earned:"84 PLUTO",  status:"Active"   },
  { name:"Bob K.",    joined:"Feb 28, 2024", earned:"120 PLUTO", status:"Active"   },
  { name:"Carol N.",  joined:"Feb 14, 2024", earned:"138 PLUTO", status:"Active"   },
  { name:"David O.",  joined:"Jan 30, 2024", earned:"0 PLUTO",   status:"Inactive" },
];

export default function ReferralPage() {
  const { showToast } = useToast();

  const copy = () => {
    navigator.clipboard?.writeText(referralLink).catch(() => {});
    showToast("Referral link copied!", "success");
  };

  return (
    <div>
      <PageHeading title="Referral Program 🎁" subtitle="Invite friends and earn 10% of their transaction fees." />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon="👥" value="7"           label="Total Referrals"      />
        <StatCard icon="💰" value="342 PLUTO"   label="Earned from Referrals" change="This month" changeDir="up" />
        <StatCard icon="🔗" value="10%"         label="Commission Rate"      />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Link + share */}
        <div className="card space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Your Referral Link</p>

          <div className="bg-[#1a1a24] border border-white/8 rounded-xl p-4 font-mono text-xs break-all text-white/60 leading-relaxed">
            {referralLink}
          </div>

          <button onClick={copy} className="w-full py-3 rounded-xl border border-[#FF7900]/35 bg-[#FF7900]/10 text-[#FF7900] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#FF7900]/20 transition-colors">
            📋 Copy Referral Link
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => showToast("Shared to Twitter!", "success")}
              className="flex-1 btn-ghost text-sm py-2.5"
            >
              🐦 Twitter
            </button>
            <button
              onClick={() => showToast("Shared to Telegram!", "success")}
              className="flex-1 btn-ghost text-sm py-2.5"
            >
              ✈ Telegram
            </button>
            <button
              onClick={() => showToast("Shared to WhatsApp!", "success")}
              className="flex-1 btn-ghost text-sm py-2.5"
            >
              💬 WhatsApp
            </button>
          </div>

          {/* How it works */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">How It Works</p>
            {[
              { n:"1", text:"Share your referral link with friends" },
              { n:"2", text:"Friend signs up and starts trading" },
              { n:"3", text:"You earn 10% of their transaction fees — forever" },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-3 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#FF7900] flex items-center justify-center text-xs font-black text-black flex-shrink-0">
                  {step.n}
                </div>
                <p className="text-sm text-white/60 pt-0.5">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referrals list */}
        <div className="card">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">Your Referrals</p>
          <div className="divide-y divide-white/8">
            {referrals.map((r, i) => (
              <div key={i} className="flex items-center gap-3 py-3.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF7900]/40 to-[#ff4d6a]/40 flex items-center justify-center text-sm font-black flex-shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{r.name}</p>
                  <p className="text-xs text-white/40">Joined {r.joined}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#00d4aa]">{r.earned}</p>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    r.status === "Active" ? "bg-[#00d4aa]/10 text-[#00d4aa]" : "bg-white/6 text-white/30"
                  }`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
