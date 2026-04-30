"use client";

export function CoinMarketsHeader({
  coinsCount,
  onAdd,
}: {
  coinsCount: number;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-black mb-0.5">Coin Markets</h1>
        <p className="text-sm text-white/40">{coinsCount} coins tracked</p>
      </div>
      <button
        onClick={onAdd}
        className="btn-primary max-w-[140px] py-2.5 text-sm"
      >
        + Add Coin
      </button>
    </div>
  );
}
