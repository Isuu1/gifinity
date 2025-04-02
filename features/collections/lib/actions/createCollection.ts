"use server";

import { CollectionNameFormState } from "@/features/collections/types/forms";
import { createClient } from "../../../../utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { Collection } from "@/interfaces/collections";

export async function createCollection(
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

    //Check if collection name already exists
    const collectionExists = currentCollections.some(
      (collection: Collection) => collection.name === data.name
    );
    if (collectionExists) {
      return {
        error: `Collection with name "${data.name}" already exists`,
        success: false,
        data: { name: data.name },
        status: 400,
      };
    }

    // Create new collection
    const newCollection = {
      id: uuidv4(),
      name: data.name,
      gifs: [],
      stickers: [],
      createdAt: new Date().toISOString(),
    };

    // Update collections array
    const { error } = await supabase
      .from("profiles")
      .update({
        collections: [...currentCollections, newCollection],
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
