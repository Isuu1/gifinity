"use client";

import ChangeDetailsForm from "@/features/user/components/ChangeDetailsForm";
import ChangePasswordForm from "@/features/user/components/ChangePasswordForm";
import ChangeUserAvatar from "@/features/user/components/ChangeUserAvatar";
import { useAuth } from "@/context/AuthProvider";

export default function Page() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div>
      <ChangeUserAvatar />
      <ChangeDetailsForm />
      <ChangePasswordForm />
    </div>
  );
}
