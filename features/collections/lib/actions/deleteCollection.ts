"use server";

import { createClient } from "@/utils/supabase/server";
import { Collection } from "@/features/collections/types/collection";

export async function deleteCollection(collection: Collection) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData?.user) {
      return {
        error: "User not authenticated",
        success: false,
        status: 401,
      };
    }

    const userId = userData.user.id;

    // Get current collections
    const { data: profileData } = await supabase
      .from("profiles")
      .select("collections")
      .eq("id", userId)
      .single();

    const currentCollections = profileData?.collections || [];

    const collectionExists = currentCollections.some(
      (col: Collection) => col.name === collection.name
    );

    if (!collectionExists) {
      return {
        error: "Collection not found",
        success: false,
        status: 404,
      };
    }

    const updatedCollections = currentCollections.filter(
      (col: Collection) => col.name !== collection.name
    );

    // Update collections array
    const { error } = await supabase
      .from("profiles")
      .update({
        collections: updatedCollections,
      })
      .eq("id", userId);

    if (error) {
      return {
        error: `Error deleting collection: ${error.message}`,
        success: false,
        status: 500,
      };
    }

    return {
      error: null,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      error: `Error creating collection: ${error}`,
      success: false,
      status: 500,
    };
  }
}
