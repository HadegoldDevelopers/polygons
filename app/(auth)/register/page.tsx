import { Suspense } from "react";
import RegisterForm from "@/components/register/RegisterForm";

export const metadata = {
  title: "Create Account",
};

export default function Page() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
