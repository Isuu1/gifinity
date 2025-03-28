"use server";

import { createClient } from "@/utils/supabase/server";

export async function clearUserFavourites() {
  const supabase = await createClient();

  // 1. Verify authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: "Authentication required", success: false };
  }

  const userId = user.id;

  // 2. Clear favorites
  const { error } = await supabase
    .from("profiles")
    .update({
      favourite_gifs: { data: [] },
      favourite_stickers: { data: [] },
    })
    .eq("id", userId);

  if (error) {
    console.error("Failed to clear favorites:", error);
    return { error: "Failed to clear favorites", success: false };
  }

  return { error: null, success: true };
}
