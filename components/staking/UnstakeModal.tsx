"use client";

import { StakingPosition } from "@/lib/staking/types";

interface Props {
  unstakeConfirm: StakingPosition | null;
  setUnstakeConfirm: (v: StakingPosition | null) => void;
  handleUnstake: (pos: StakingPosition, force?: boolean) => void;
}

export default function UnstakeModal({ unstakeConfirm, setUnstakeConfirm, handleUnstake }: Props) {
  if (!unstakeConfirm) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#111118] p-6 rounded-xl border border-white/10 w-full max-w-sm space-y-4">
        <h2 className="text-lg font-bold">Unstake Early?</h2>
        <p className="text-white/60 text-sm">
          This stake has not completed its term.  
          Unstaking now may incur penalties.
        </p>

        <div className="flex gap-3">
          <button
            className="flex-1 py-2 rounded-lg bg-white/10 text-white"
            onClick={() => setUnstakeConfirm(null)}
          >
            Cancel
          </button>

          <button
            className="flex-1 py-2 rounded-lg bg-[#FF7900] text-black font-bold"
            onClick={() => handleUnstake(unstakeConfirm, true)}
          >
            Unstake Anyway
          </button>
        </div>
      </div>
    </div>
  );
}
