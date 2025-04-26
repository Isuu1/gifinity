"use server";

import { CollectionNameFormState } from "@/features/collections/types/forms";
import { createClient } from "@/supabase/server";
import { Collection } from "@/features/collections/types/collection";

export async function editCollectionName(
  collection: Collection,
  prevState: CollectionNameFormState,
  formData: FormData
) {
  //Form data from frontend form
  const data = {
    name: formData.get("name") as string,
  };

  if (!data.name) {
    return {
      error: "Please name your collection",
      success: false,
      data: { name: data.name },
      status: 400,
    };
  }

  try {
    const supabase = await createClient();

    // Get the authenticated user
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData?.user) {
      return {
        error: "User not authenticated",
        success: false,
        data: { name: data.name },
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

    const updatedCollections = currentCollections.map((col: Collection) => {
      if (col.name === collection.name) {
        return {
          ...col,
          name: data.name,
        };
      }
      return col;
    });

    // Update collections array
    const { error } = await supabase
      .from("profiles")
      .update({
        collections: updatedCollections,
      })
      .eq("id", userId);

    if (error) {
      return {
        error: `Error creating collection: ${error.message}`,
        success: false,
        data: { name: data.name },
        status: 500,
      };
    }

    return {
      error: null,
      success: true,
      data: { name: data.name },
      status: 200,
    };
  } catch (error) {
    return {
      error: `Error creating collection: ${error}`,
      success: false,
      data,
      status: 500,
    };
  }
}
