import { ToastProvider } from "@/context/ToastContext";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden px-4">
        {/* Background orbs */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#FF7900]/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-[#FF7900]/5 blur-[120px] pointer-events-none" />
        {children}
      </div>
    </ToastProvider>
  );
}
