"use client";

//Components
import ResetPasswordForm from "@/components/Authentication/ResetPasswordForm/ResetPasswordForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token_hash"); // Ensure token exists

  useEffect(() => {
    if (!token) {
      router.replace("/"); // Redirect if accessed directly
    }
  }, [token, router]);

  return <ResetPasswordForm />;
}
