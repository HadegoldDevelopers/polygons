"use client";

interface AdminTopbarProps {
  title: string;
  onMenuClick: () => void;
}

export default function AdminTopbar({ title, onMenuClick }: AdminTopbarProps) {
  return (
    <header className="h-14 flex items-center justify-between px-5 border-b border-white/8 bg-[#0a0a0f] sticky top-0 z-30 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden w-8 h-8 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center"
        >
          ☰
        </button>
        <h2 className="text-base font-bold">{title}</h2>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF7900]/10 border border-[#FF7900]/20">
          <div className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
          <span className="text-xs font-bold text-[#FF7900]">Admin</span>
        </div>
      </div>
    </header>
  );
}