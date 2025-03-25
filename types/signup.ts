import { ZodFormattedError } from "zod";

//Signup
export type SignupError =
  | { error: null } // No errors
  | { error: string } // General string error (e.g., "Passwords do not match")
  | { error: ZodFormattedError<{ email: string; password: string }, string> }; // Zod validation errors
