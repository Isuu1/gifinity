"use server";

import { createClient } from "@/supabase/server";
import { ForgotPasswordFormState } from "../../types/forms";

export async function forgotPassword(
  prevData: ForgotPasswordFormState,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
  };

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    return {
      data,
      error: error.message,
      success: false,
      status: 400,
      message: "Invalid email address",
      resetKey: Date.now(),
    };
  }

  return {
    data,
    error: null,
    success: true,
    status: 200,
    message:
      "If this email exists in our system, you will receive a reset link.",
    resetKey: Date.now(),
  };
}
