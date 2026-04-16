"use client";

import { useState } from "react";
import { StakingPosition } from "@/lib/staking/types";

interface Props {
  completed: StakingPosition[];
}

export default function CompletedStakes({ completed }: Props) {
  const PAGE_SIZE = 4;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = completed.slice(0, visibleCount);
  const hasMore = visibleCount < completed.length;

  return (
    <div className="flex flex-col h-full">
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
        Completed Stakes
      </p>

      {/* Scrollable container */}
      <div
        className="flex-1 overflow-y-auto pr-1"
        style={{ maxHeight: "420px" }}
      >
        {visible.length === 0 && (
          <p className="text-white/40 text-sm">No completed stakes.</p>
        )}

        <div className="space-y-4">
          {visible.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-xl bg-[#111118] border border-white/5"
            >
              <p className="font-bold text-lg">{p.coin}</p>
              <p className="text-white/40 text-sm">{p.staking_terms?.name}</p>

              <div className="mt-3 text-sm space-y-1">
                <p>
                  Amount: <strong>{p.amount.toLocaleString()}</strong>
                </p>
                <p>
                  Total Earned:{" "}
                  <strong className="text-[#00d4aa]">
                    {Number(p.claimed_reward).toFixed(8)}
                  </strong>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fade-out gradient */}
        {hasMore && (
          <div className="pointer-events-none h-10 -mt-10 bg-gradient-to-t from-[#111118] to-transparent" />
        )}
      </div>

      {/* Load More */}
      {hasMore && (
        <button
          onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
          className="mt-3 w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-bold transition"
        >
          Load More
        </button>
      )}
    </div>
  );
}
