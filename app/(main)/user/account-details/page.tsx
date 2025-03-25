"use client";

import ChangeDetailsForm from "@/components/User/ChangeDetailsForm/ChangeDetailsForm";
import ChangePasswordForm from "@/components/User/ChangePasswordForm/ChangePasswordForm";
import ChangeUserAvatar from "@/components/User/ChangeUserAvatar/ChangeUserAvatar";
import { useAuth } from "@/context/AuthContext";

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
