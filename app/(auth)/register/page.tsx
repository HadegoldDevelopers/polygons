import { Suspense } from "react";
import RegisterForm from "@/components/register/RegisterForm";

export default function Page() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
