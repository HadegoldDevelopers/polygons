"use client";
import { ReactNode } from "react";

// ── Stat card ──────────────────────────────────────────────────────
interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}
export function AdminStatCard({ icon, label, value, sub, color = "#FF7900" }: StatCardProps) {
  return (
    <div className="bg-[#111118] border border-white/8 rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full blur-2xl opacity-20"
        style={{ background: color }} />
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 relative z-10"
        style={{ background: `${color}20` }}>
        {icon}
      </div>
      <p className="text-2xl font-black mb-0.5 relative z-10">{value}</p>
      <p className="text-xs text-white/40 font-medium relative z-10">{label}</p>
      {sub && <p className="text-[11px] mt-1 font-semibold relative z-10" style={{ color }}>{sub}</p>}
    </div>
  );
}

// ── Status badge ───────────────────────────────────────────────────
interface BadgeProps { status: string | boolean;}
export function StatusBadge({ status }: BadgeProps) {
  const styles: Record<string, string> = {
    confirmed: "bg-[#00d4aa]/10 text-[#00d4aa]",
    completed: "bg-[#00d4aa]/10 text-[#00d4aa]",
    approved:  "bg-[#00d4aa]/10 text-[#00d4aa]",
    active:    "bg-[#00d4aa]/10 text-[#00d4aa]",
    pending:   "bg-yellow-400/10 text-yellow-400",
    waiting:   "bg-yellow-400/10 text-yellow-400",
    failed:    "bg-[#ff4d6a]/10 text-[#ff4d6a]",
    rejected:  "bg-[#ff4d6a]/10 text-[#ff4d6a]",
    banned:    "bg-[#ff4d6a]/10 text-[#ff4d6a]",
    verified:  "bg-blue-400/10 text-blue-400",
    is_admin:     "bg-[#FF7900]/15 text-[#FF7900]",
    user:      "bg-white/8 text-white/50",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${styles[status] ?? "bg-white/8 text-white/50"}`}>
      {status}
    </span>
  );
}

// ── Table ──────────────────────────────────────────────────────────
interface TableProps {
  headers: string[];
  children: ReactNode;
  empty?: string;
  isEmpty?: boolean;
}
export function AdminTable({ headers, children, empty = "No records found", isEmpty }: TableProps) {
  return (
    <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/8">
            {headers.map((h) => (
              <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-white/35 px-4 py-3.5 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">
          {isEmpty ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-12 text-sm text-white/30">
                {empty}
              </td>
            </tr>
          ) : children}
        </tbody>
      </table>
    </div>
  );
}

// ── Search + filter bar ────────────────────────────────────────────
interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  children?: ReactNode;
}
export function SearchBar({ value, onChange, placeholder = "Search...", children }: SearchBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`🔍 ${placeholder}`}
        className="field max-w-[280px] py-2.5 text-sm flex-1"
      />
      {children}
    </div>
  );
}

// ── Filter chip ────────────────────────────────────────────────────
interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}
export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
        active
          ? "bg-[#FF7900]/15 border-[#FF7900]/40 text-[#FF7900]"
          : "bg-[#111118] border-white/8 text-white/50 hover:border-white/20"
      }`}
    >
      {label}
    </button>
  );
}

// ── Modal ──────────────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
export function AdminModal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="bg-[#111118] border border-white/8 rounded-2xl p-6 w-full max-w-[480px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-black">{title}</h3>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center text-sm hover:bg-white/10">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Confirm dialog ─────────────────────────────────────────────────
interface ConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
}
export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = "Confirm", danger }: ConfirmProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="bg-[#111118] border border-white/8 rounded-2xl p-6 w-full max-w-[380px]"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="text-base font-black mb-2">{title}</h3>
        <p className="text-sm text-white/50 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/15 text-sm font-bold hover:bg-white/4">
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold ${
              danger
                ? "bg-[#ff4d6a] text-white hover:bg-[#ff3355]"
                : "bg-[#FF7900] text-black hover:bg-[#ff8c1a]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────
export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-[#111118] border border-white/8 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-12 bg-white/4 border-b border-white/8" />
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-3.5 border-b border-white/8 last:border-0">
          {[...Array(cols)].map((_, j) => (
            <div key={j} className="h-4 bg-white/6 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}