"use client";

import { AdminModal } from "@/components/admin/ui/AdminUI";
import type { CoinMarket } from "@/lib/admin/types";

export function CoinMarketModal({
  editing,
  onClose,
  saving,
  save,
  setField,
}: {
  editing: CoinMarket | null;
  onClose: () => void;
  saving: boolean;
  save: () => void;
  setField: (key: keyof CoinMarket, val: string | number) => void;
}) {
  return (
    <AdminModal
      open={!!editing}
      onClose={onClose}
      title={editing?.name ? `Edit ${editing.name}` : "Add Coin"}
    >
      {editing && (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                Symbol
              </label>
              <input
                type="text"
                className="field text-sm"
                placeholder="BTC"
                value={editing.symbol}
                onChange={e =>
                  setField("symbol", e.target.value.toUpperCase())
                }
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                Name
              </label>
              <input
                type="text"
                className="field text-sm"
                placeholder="Bitcoin"
                value={editing.name}
                onChange={e => setField("name", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                Icon (emoji)
              </label>
              <input
                type="text"
                className="field text-sm"
                placeholder="₿"
                value={editing.icon}
                onChange={e => setField("icon", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                Price (USD)
              </label>
              <input
                type="number"
                className="field text-sm"
                value={editing.price}
                onChange={e => setField("price", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                24h Change (%)
              </label>
              <input
                type="number"
                className="field text-sm"
                step="0.01"
                value={editing.change_24h}
                onChange={e =>
                  setField("change_24h", Number(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                7d Change (%)
              </label>
              <input
                type="number"
                className="field text-sm"
                step="0.01"
                value={editing.change_7d}
                onChange={e =>
                  setField("change_7d", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                Market Cap
              </label>
              <input
                type="number"
                className="field text-sm"
                value={editing.market_cap}
                onChange={e =>
                  setField("market_cap", Number(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                Volume 24h
              </label>
              <input
                type="number"
                className="field text-sm"
                value={editing.volume_24h}
                onChange={e =>
                  setField("volume_24h", Number(e.target.value))
                }
              />
            </div>
          </div>

          <button onClick={save} disabled={saving} className="btn-primary">
            {saving ? "Saving…" : "Save Coin"}
          </button>
        </div>
      )}
    </AdminModal>
  );
}
