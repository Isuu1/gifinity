"use server";

import { ChangeDetailsError } from "@/types/changeDetails";
import { createClient } from "@/utils/supabase/server";

export async function changeUserDetails(
  prevState: ChangeDetailsError,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
  };

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

  const userId = userData.user.id;

  // // Update email in the Auth table
  // if (data.email !== userData.user.email) {
  //   const { error: emailError } = await supabase.auth.updateUser({
  //     email: data.email,
  //   });

  //   if (emailError) {
  //     return {
  //       data,
  //       error: "Failed to update email",
  //       success: false,
  //     };
  //   }
  // }

  //Update user email and username in users table
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ username: data.username, email: data.email })
    .eq("id", userId);

  if (profileError) {
    return {
      data,
      error: "Failed to update username",
      success: false,
      resetKey: Date.now(),
    };
  }

  return {
    data,
    error: null,
    success: true,
    resetKey: Date.now(),
  };
}
