"use server";

import { z, ZodFormattedError } from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

type SignupError =
  | { error: null } // No errors
  | { error: string } // General string error (e.g., "Passwords do not match")
  | { error: ZodFormattedError<{ email: string; password: string }, string> }; // Zod validation errors

export async function signup(prevState: SignupError, formData: FormData) {
  const supabase = await createClient();

  //Form data from frontend form
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const signupSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

  const validateSignupData = signupSchema.safeParse(data);

  //Return data along with error message to to able to set email as default value (prevent clearing the input)
  if (!validateSignupData.success) {
    return { data, error: validateSignupData.error.format() };
  }

  //Return data along with error message to to able to set email as default value (prevent clearing the input)
  if (data.password !== data.confirmPassword) {
    return { data, error: "Passwords do not match" };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");

  return { error: null };
}
