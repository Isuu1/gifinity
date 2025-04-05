"use client";

import ChangeDetailsForm from "@/features/user/components/ChangeDetailsForm";
import ChangePasswordForm from "@/features/user/components/ChangePasswordForm";

export default function Page() {
  return (
    <div style={{ minWidth: 0 }}>
      <ChangeDetailsForm />
      <ChangePasswordForm />
    </div>
  );
}
