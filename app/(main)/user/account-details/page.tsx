"use client";

import ChangeDetailsForm from "@/components/User/ChangeDetailsForm/ChangeDetailsForm";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div>
      <h1>Account details</h1>
      <ChangeDetailsForm />
    </div>
  );
}
