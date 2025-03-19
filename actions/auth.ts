"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { SignupError, signupSchema } from "@/utils/authValidation";

//
// Login process
//

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
  return { data, error: null, success: "You're logged in now!" };
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

  // Include all initial user data in metadata to insert them in the database
  const { data: user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        user_email: data.email,
        user_name: "",
        favouriteGifs: {
          data: [],
        },
        favouriteStickers: {
          data: [],
        },
      },
    },
  });

  if (error) {
    return { error: error.message, resetKey: Date.now() };
  }

  //Upon successful registration, return success message
  return {
    data,
    error: null,
    success:
      "Registration successful! Please check your email to confirm your account.",
  };
}
