"use server";

import { createClient } from "@/utils/supabase/server";
//Interfaces
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";
import { Collection } from "../../types/collection";

export async function saveToCollection(
  media: Gif | Sticker,
  collectionName: string
) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData?.user) {
      return { error: "User not authenticated", status: 401 };
    }

    const userId = userData.user.id;

    //Select the user's profile favourite gifs table
    const { data: userCollections } = await supabase
      .from("profiles")
      .select("collections")
      .eq("id", userId)
      .single();

    //Find collection by name
    const collection = userCollections?.collections.find(
      (collection: Collection) => collection.name === collectionName
    );

    if (media.type === "gif") {
      // Check if gif is already in the collection
      const isGifInCollection = collection.gifs.some(
        (gif: Gif) => gif.id === media.id
      );

      const updatedGifs = isGifInCollection
        ? collection.gifs.filter((gif: Gif) => gif.id !== media.id)
        : [...collection.gifs, media];

      const updatedCollections = userCollections?.collections.map(
        (c: Collection) =>
          c.id === collection.id ? { ...c, gifs: updatedGifs } : c
      );

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ collections: updatedCollections })
        .eq("id", userId)
        .single();

      if (updateError) {
        return {
          error: `Error updating collection, ${updateError}`,
          status: 500,
        };
      }
      return { success: true, gif: true, status: 200 };
    }

    if (media.type === "sticker") {
      // Check if sticker is already in the collection
      const isStickerInCollection = collection.stickers.some(
        (sticker: Sticker) => sticker.id === media.id
      );

      const updatedStickers = isStickerInCollection
        ? collection.stickers.filter(
            (sticker: Sticker) => sticker.id !== media.id
          )
        : [...collection.stickers, media];

      const updatedCollections = userCollections?.collections.map(
        (c: Collection) =>
          c.id === collection.id ? { ...c, stickers: updatedStickers } : c
      );

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ collections: updatedCollections })
        .eq("id", userId)
        .single();

      if (updateError) {
        return {
          error: `Error updating collection, ${updateError}`,
          status: 500,
        };
      }
      return { success: true, sticker: true, status: 200 };
    }
  } catch (error) {
    return { error: `Error updating collecion, ${error}`, status: 500 };
  }
}
