"use server";

import { changePasswordSchema } from "@/features/user/schemas/changePassword";
import { ChangeDetailsError } from "@/features/user/types/changeDetails";
import { createClient } from "@/utils/supabase/server";

export async function changeUserPassword(
  prevState: ChangeDetailsError,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    newPassword: formData.get("new-password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  };
  console.log("data", data);
  // Get the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData.user) {
    return {
      data,
      error: "User not authenticated",
      success: false,
      resetKey: Date.now(),
    };
  }
  const validateSignupData = changePasswordSchema.safeParse(data);

  if (!validateSignupData.success) {
    return {
      data,
      error: validateSignupData.error.format(),
      success: false,
      resetKey: Date.now(),
    };
  }

  //Update password in the Auth table
  const { error: passwordError } = await supabase.auth.updateUser({
    password: data.newPassword,
  });

  if (passwordError) {
    return {
      data,
      error: passwordError.message,
      success: false,
    };
  }

  return {
    data,
    error: null,
    success: true,
    resetKey: Date.now(),
  };
}
