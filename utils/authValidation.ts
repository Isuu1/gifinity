import { z, ZodFormattedError } from "zod";

//Signup
export type SignupError =
  | { error: null } // No errors
  | { error: string } // General string error (e.g., "Passwords do not match")
  | { error: ZodFormattedError<{ email: string; password: string }, string> }; // Zod validation errors

export const signupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must include at least one number" }),
});

export const updatePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must include at least one number" }),
});
