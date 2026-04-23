export default function LegalSection({
number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative bg-[#111118] border border-white/6 rounded-2xl p-6 md:p-8 hover:border-[#FF7900]/20 transition-colors">
      <div className="flex items-start gap-5">
        <span className="text-[#FF7900]/30 font-black text-2xl leading-none flex-shrink-0 font-mono">
          {number}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-black mb-4 text-white">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
