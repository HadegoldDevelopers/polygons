import Link from "next/link";

export default function LegalLayout({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-[#FF7900]/4 blur-[120px]" />
        <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-[#FF7900]/3 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 py-16 md:py-24">

        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF7900]/10 border border-[#FF7900]/20 text-[#FF7900] text-xs font-bold uppercase tracking-widest mb-5">
            Legal Document
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
            {title.split(" ").map((word, i) =>
              i === 1 ? <span key={i} className="text-[#FF7900]">{word}</span> : `${word} `
            )}
          </h1>

          {subtitle && (
            <p className="text-white/40 text-sm">{subtitle}</p>
          )}
        </div>

        {children}

        {/* Footer links */}
        <div className="mt-14 pt-8 border-t border-white/8 flex flex-wrap gap-4 text-sm text-white/30">
          <Link href="/aml-kyc" className="hover:text-[#FF7900] transition-colors">AML/KYC Policy</Link>
          <span>·</span>
          <Link href="/refund" className="hover:text-[#FF7900] transition-colors">Refund Policy</Link>
          <span>·</span>
          <Link href="/" className="hover:text-[#FF7900] transition-colors">polycognicapital.com</Link>
        </div>
      </div>
    </div>
  );
}
