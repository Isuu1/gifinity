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

  return {
    data,
    error: null,
    success: true,
    resetKey: Date.now(),
  };
}
