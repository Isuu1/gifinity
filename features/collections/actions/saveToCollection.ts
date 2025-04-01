"use server";

import { Collection } from "@/interfaces/collections";
import { createClient } from "../../../utils/supabase/server";
//Interfaces
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";

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
    console.log("collection", collection);
    console.log("userCollections", userCollections?.collections);

    if (media.type === "gif") {
      // Check if gif is already in the collection
      const isGifInCollection = collection.gifs.some(
        (gif: Gif) => gif.id === media.id
      );

      console.log("isGifInCollection", isGifInCollection);

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
      return { success: true, status: 200 };
    }

    // //Add Gif to favourites
    // if (media.type === "gif") {
    //   // Check if the gif is already in the user's favourite gifs
    //   const isGifInFavourites = userFavouriteGifs?.favourite_gifs.data.some(
    //     (gif: Gif) => gif.id === media.id
    //   );

    //   //Create a new variable to hold the updated favourite gifs
    //   //Has to be declared here to be accessible outside the if statement
    //   let updatedFavouriteGifs;

    //   if (isGifInFavourites) {
    //     // Remove the gif from the user's favourite gifs
    //     updatedFavouriteGifs = {
    //       data: userFavouriteGifs?.favourite_gifs.data.filter(
    //         (gif: Gif) => gif.id !== media.id
    //       ),
    //     };
    //   } else {
    //     // Update the favouriteStickers array
    //     updatedFavouriteGifs = {
    //       data: [...userFavouriteGifs?.favourite_gifs.data, media],
    //     };
    //   }

    //   //Update the user's metadata with the new favouriteGifs array
    //   const { error: updateError } = await supabase
    //     .from("profiles")
    //     .update({ favourite_gifs: updatedFavouriteGifs })
    //     .eq("id", userId)
    //     .single();

    //   if (updateError) {
    //     return {
    //       error: `Error updating favourites, ${updateError}`,
    //       status: 500,
    //     };
    //   }

    //   return { success: "Gif added to wishlist", status: 200 };
    // }

    // //Add Sticker to favourites
    // if (media.type === "sticker") {
    //   // Check if the gif is already in the user's favourite gifs
    //   const isStickerInFavourites =
    //     userFavouriteStickers?.favourite_stickers.data.some(
    //       (sticker: Sticker) => sticker.id === media.id
    //     );

    //   //Create a new variable to hold the updated favourite gifs
    //   //Has to be declared here to be accessible outside the if statement
    //   let updatedFavouriteStickers;

    //   if (isStickerInFavourites) {
    //     // Remove the gif from the user's favourite gifs
    //     updatedFavouriteStickers = {
    //       data: userFavouriteStickers?.favourite_stickers.data.filter(
    //         (sticker: Sticker) => sticker.id !== media.id
    //       ),
    //     };
    //   } else {
    //     // Update the favouriteStickers array
    //     updatedFavouriteStickers = {
    //       data: [...userFavouriteStickers?.favourite_stickers.data, media],
    //     };
    //   }

    //   //Update the user's metadata with the new favouriteGifs array
    //   const { error: updateError } = await supabase
    //     .from("profiles")
    //     .update({ favourite_stickers: updatedFavouriteStickers })
    //     .eq("id", userId)
    //     .single();

    //   if (updateError) {
    //     return {
    //       error: `Error updating favourites, ${updateError}`,
    //       status: 500,
    //     };
    //   }

    //   return { success: "Favourite sticker added", status: 200 };
    // }
  } catch (error) {
    return { error: `Error updating collecion, ${error}`, status: 500 };
  }
}
