"use server";

import { createClient } from "../supabase/server";
//Interfaces
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";

export async function saveFavouriteMediaToDb(media: Gif | Sticker) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData?.user) {
      return { error: "User not authenticated", status: 401 };
    }

    const userId = userData.user.id;

    // Create the media data object
    const mediaData = {
      type: media.type,
      id: media.id,
      title: media.title,
      url: media.images?.original?.url || null,
      user: {
        display_name: media.user?.display_name || null,
        avatar_url: media.user?.avatar_url || null,
      },
    };

    //Select the user's profile favourite gifs table
    const { data: userFavouriteGifs } = await supabase
      .from("profiles")
      .select("favourite_gifs")
      .eq("id", userId)
      .single();

    if (media.type === "gif") {
      // Check if the gif is already in the user's favourite gifs
      const isGifInFavourites = userFavouriteGifs?.favourite_gifs.data.some(
        (gif: Gif) => gif.id === mediaData.id
      );

      //Create a new variable to hold the updated favourite gifs
      //Has to be declared here to be accessible outside the if statement
      let updatedFavouriteGifs;

      if (isGifInFavourites) {
        // Remove the gif from the user's favourite gifs
        updatedFavouriteGifs = {
          data: userFavouriteGifs?.favourite_gifs.data.filter(
            (gif: Gif) => gif.id !== mediaData.id
          ),
        };
      } else {
        // Update the favouriteStickers array
        updatedFavouriteGifs = {
          data: [...userFavouriteGifs?.favourite_gifs.data, mediaData],
        };
      }

      //Update the user's metadata with the new favouriteGifs array
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ favourite_gifs: updatedFavouriteGifs })
        .eq("id", userId)
        .single();

      if (updateError) {
        return {
          error: `Error updating favourites, ${updateError}`,
          status: 500,
        };
      }

      return { success: "Favourite gif added", status: 200 };
    }
  } catch (error) {
    return { error: `Error updating favourites, ${error}`, status: 500 };
  }
}
