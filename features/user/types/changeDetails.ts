import { ZodFormattedError } from "zod";

export type ChangeDetailsError =
  | { error: null } // No errors
  | { error: string } // General string error (e.g., "Passwords do not match")
  | { error: ZodFormattedError<{ email: string; username: string }, string> }; // Zod validation errors
