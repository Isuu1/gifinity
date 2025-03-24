"use server";

import { createClient } from "@/utils/supabase/server";
import { ZodFormattedError } from "zod";

type ChangeDetailsError =
  | { error: null } // No errors
  | { error: string } // General string error (e.g., "Passwords do not match")
  | { error: ZodFormattedError<{ email: string; username: string }, string> }; // Zod validation errors

export async function changeUserDetails(
  prevState: ChangeDetailsError,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
  };

  console.log(data);

  // Get the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData.user) {
    return {
      data,
      error: "User not authenticated",
      success: false,
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
    .update({ user_name: data.username, user_email: data.email })
    .eq("id", userId);

  if (profileError) {
    return {
      data,
      error: "Failed to update username",
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
