// app/(auth)/register/page.tsx
// This file wraps the register form in Suspense
// which is required because RegisterForm uses useSearchParams()

import { Suspense } from "react";
import RegisterForm from "@/components/register/RegisterForm";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[440px] bg-[#111118] border border-white/8 rounded-2xl p-10 shadow-2xl relative z-10 flex items-center justify-center min-h-[400px]">
          <span className="w-8 h-8 border-2 border-[#FF7900]/30 border-t-[#FF7900] rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}