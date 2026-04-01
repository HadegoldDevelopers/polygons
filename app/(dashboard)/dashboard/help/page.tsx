"use client";
import { useState } from "react";
import { PageHeading } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

const faqs = [
  { q:"How do I deposit PLUTO tokens?",       a:"Go to the Deposit page, select PLUTO, copy your wallet address and send from any ERC-20 compatible wallet. Deposits confirm in ~12 blocks (~5 minutes)." },
  { q:"How long does a withdrawal take?",     a:"Withdrawals typically process within 10 minutes. Network congestion may occasionally cause delays up to 30 minutes." },
  { q:"What is the minimum swap amount?",     a:"The minimum swap amount is 100 PLUTO or the equivalent value in the input token." },
  { q:"How does staking work?",               a:"Stake your PLUTO tokens for a fixed period (30, 90, or 180 days) and earn APY rewards. Rewards accumulate daily and can be claimed after the lock period." },
  { q:"Is my wallet secure?",                 a:"Yes. Your funds are secured by smart contracts audited by SolidProof and QuillAudits. We recommend enabling 2FA for additional account security." },
  { q:"How do I contact support?",            a:"Use the live chat button at the bottom-right, email us at info@plutochain.io, or join our Discord community." },
];

export default function HelpPage() {
  const { showToast } = useToast();
  const [open, setOpen] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  
  const handleTicket = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if (!subject || !message) { showToast("Please fill in all fields", "error"); return; }
    showToast("Support ticket submitted! We'll respond within 24h ✓", "success");
    setSubject(""); setMessage("");
  };

  return (
    <div>
      <PageHeading title="Help Center ❓" subtitle="Find answers or contact our support team." />

      {/* Support cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon:"📚", title:"Documentation",    desc:"Guides and API reference",      action:() => showToast("Opening docs...", "info") },
          { icon:"💬", title:"Live Chat",         desc:"Talk to support team",          action:() => showToast("Opening chat...", "info") },
          { icon:"🎮", title:"Discord",           desc:"Join 12,000+ community",        action:() => showToast("Opening Discord...", "info") },
          { icon:"✉️", title:"Email Support",    desc:"info@plutochain.io",            action:() => showToast("Opening email...", "info") },
        ].map((c) => (
          <button
            key={c.title}
            onClick={c.action}
            className="stat-card text-left hover:border-[#FF7900]/35 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF7900]/15 flex items-center justify-center text-xl mb-3 relative z-10">{c.icon}</div>
            <p className="text-sm font-bold mb-1 relative z-10">{c.title}</p>
            <p className="text-xs text-white/40 relative z-10">{c.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ */}
        <div className="card">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-5">Frequently Asked Questions</p>
          <div className="divide-y divide-white/8">
            {faqs.map((faq, i) => (
              <div key={i} className="py-4">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 text-left"
                >
                  <span className="text-sm font-bold">{faq.q}</span>
                  <span className={`text-[#FF7900] text-lg flex-shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {open === i && (
                  <p className="text-sm text-white/50 mt-3 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit ticket */}
        <div className="card">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-5">Submit a Support Ticket</p>
          <form onSubmit={handleTicket} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Subject</label>
              <input type="text" className="field" placeholder="What do you need help with?" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Category</label>
              <select className="field cursor-pointer">
                <option>Deposit / Withdrawal</option>
                <option>Swap</option>
                <option>Staking</option>
                <option>Account / Security</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">Message</label>
              <textarea
                className="field resize-none"
                rows={5}
                placeholder="Describe your issue in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Submit Ticket →</button>
          </form>
        </div>
      </div>
    </div>
  );
}
