const variantClasses = {
  neutral: "border-white/6 hover:border-[#FF7900]/20",
  warning: "border-[#ff4d6a]/10 hover:border-[#ff4d6a]/25",
  success: "border-[#00d4aa]/10 hover:border-[#00d4aa]/25",
  danger:  "border-[#ff4d6a]/15 hover:border-[#ff4d6a]/30",
};

export default function LegalSectionVariant({
  number,
  title,
  variant = "neutral",
  children,
}: {
  number: string;
  title: string;
  variant?: "neutral" | "warning" | "success" | "danger";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative bg-[#111118] border rounded-2xl p-6 md:p-8 transition-colors ${variantClasses[variant]}`}
    >
      <div className="flex items-start gap-5">
        <span className="text-[#FF7900]/30 font-black text-xl leading-none flex-shrink-0 font-mono">
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
