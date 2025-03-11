"use server";

import { revalidatePath } from "next/cache";
//import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { SignupError, signupSchema } from "@/utils/authValidation";

export async function login(prevData: SignupError, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  //resetKey is crucial to trigger useEffect in form component even if the error is the same
  if (error) {
    return { data, error: error.message, resetKey: Date.now() };
  }

  revalidatePath("/", "layout");
  // redirect("/");
  return { data, error: null, success: "Login successful!" };
}

//
// Signup process
//

export async function signup(prevState: SignupError, formData: FormData) {
  const supabase = await createClient();

  //Form data from frontend form
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validateSignupData = signupSchema.safeParse(data);

  //Return data along with error message to to able to set email as default value (prevent clearing the input)
  if (!validateSignupData.success) {
    return {
      data,
      error: validateSignupData.error.format(),
      resetKey: Date.now(),
    };
  }

  //Return data along with error message to to able to set email as default value (prevent clearing the input)
  if (data.password !== data.confirmPassword) {
    return { data, error: "Passwords do not match", resetKey: Date.now() };
  }

  //Check if user is already registered
  // const checkUserInDb = await supabase
  //   .from("profiles")
  //   .select("id")
  //   .eq("email", data.email) //eq() is a filter method to check for email
  //   .single(); //single() returns only one record

  // if (checkUserInDb) {
  //   return { data, error: "User already exists", resetKey: Date.now() };
  // }

  // Include all initial user data in metadata to insert them in the database
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        user_email: data.email,
        user_name: "",
        favourites: JSON.stringify({
          gifs: [],
          stickers: [],
        }), // Ensuring it's a valid JSON
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  //Upon successful registration, return success message
  return {
    data,
    error: null,
    success:
      "Registration successful! Please check your email to confirm your account.",
  };
}

export async function forgotPassword(
  prevData: SignupError,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
  };

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: "http://localhost:3000/reset-password",
  });

  if (error) {
    return { data, error: error.message, resetKey: Date.now() };
  }

  return {
    data,
    error: null,
    success:
      "If this email exists in our system, you will receive a reset link.",
  };
}

export async function resetPassword(prevData: SignupError, formData: FormData) {
  const supabase = await createClient();

  const data = {
    newPassword: formData.get("email") as string,
    confirmNewPassword: formData.get("confirmNewPassword") as string,
  };

  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
  });

  if (error) {
    return { data, error: error.message, resetKey: Date.now() };
  }

  return {
    data,
    error: null,
    success:
      "Password reset successful! You can now log in with your new password.",
  };
}
