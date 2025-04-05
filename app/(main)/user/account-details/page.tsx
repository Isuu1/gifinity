"use client";

import ChangeDetailsForm from "@/features/user/components/ChangeDetailsForm";
import ChangePasswordForm from "@/features/user/components/ChangePasswordForm";
import { useAuth } from "@/providers/AuthProvider";

export default function Page() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div>
      <ChangeDetailsForm />
      <ChangePasswordForm />
    </div>
  );
}
