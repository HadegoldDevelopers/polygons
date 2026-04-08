export function ReferralHowItWorks() {
  const steps = [
    { n: "1", text: "Share your referral link with friends" },
    { n: "2", text: "Friend signs up and starts trading" },
    { n: "3", text: "You earn 10% of their transaction fees — forever" },
  ];

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
        How It Works
      </p>

      {steps.map((step) => (
        <div key={step.n} className="flex items-start gap-3 mb-3">
          <div className="w-7 h-7 rounded-lg bg-[#FF7900] flex items-center justify-center text-xs font-black text-black flex-shrink-0">
            {step.n}
          </div>
          <p className="text-sm text-white/60 pt-0.5">{step.text}</p>
        </div>
      ))}
    </div>
  );
}
