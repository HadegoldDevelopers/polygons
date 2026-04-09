interface Referral {
  created_at: string;
  referred_id: string;
  profiles: {
    name: string;
  };
  earnings: { amount: number }[];
}

interface ReferralListProps {
  referrals: Referral[];
}

export function ReferralList({ referrals }: ReferralListProps) {
  
  return (
    <div className="card">
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">
        Your Referrals
      </p>

      <div className="divide-y divide-white/8">
        {referrals.map((r, i) => {
          const total = r.earnings.reduce((sum, e) => sum + e.amount, 0);
          return (
            <div key={i} className="flex items-center gap-3 py-3.5">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#FF7900]/40 to-[#ff4d6a]/40 flex items-center justify-center text-sm font-black flex-shrink-0">
                {r.profiles?.name?.charAt(0) ?? "?"}
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold">{r.profiles?.name}</p>
                <p className="text-xs text-white/40">
                  Joined {new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-[#00d4aa]">
                  {total.toFixed(2)} PC
                </p>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#00d4aa]/10 text-[#00d4aa]">
                  Active
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
