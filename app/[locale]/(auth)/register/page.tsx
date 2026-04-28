import { Suspense } from "react";
import RegisterForm from "@/components/register/RegisterForm";

export const metadata = {
  title: "Create Account",
  description: "Sign up for a Polycogni Capital account.",
};

export default function Page() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
