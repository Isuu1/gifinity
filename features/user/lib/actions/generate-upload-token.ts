"use server";

import { createClient } from "@/supabase/server";

export async function generateUploadToken() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("Not authenticated");

  // Get fresh session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session) throw new Error("No active session");

  // Store the token
  const { data, error } = await supabase
    .from("upload_signatures")
    .upsert({
      user_id: user.id,
      token: session.access_token,
    })
    .select("token")
    .single();

  if (error) throw error;

  return data;
}
