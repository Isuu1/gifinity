"use server";

import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";
import { createClient } from "@/utils/supabase/server";

export async function uploadFile(formData: FormData) {
  //Get form data
  const file = formData.get("file");
  const tags = formData.get("tags");
  const fileUrl = formData.get("fileUrl");

  console.log("fileurl in action", fileUrl);
  console.log("file in action", file);

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return {
      success: false,
      data: null,
      error: "API key is missing",
      status: 500,
    };
  }
  //Giphy upload API URL
  const url = `https:/upload.giphy.com/v1/gifs?api_key=${apiKey}&tags=${tags}${
    fileUrl ? "&source_image_url=" + fileUrl : ""
  }`;
  console.log("url", url);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      success: false,
      data: null,
      error: `Error uploading file: ${errorData.message}`,
      status: response.status,
    };
  }

  const data = await response.json();

  console.log("data", data);

  const supabase = await createClient();

  // Get the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    return {
      success: false,
      data: null,
      error: "User not authenticated",
      status: 401,
    };
  }

  const userId = userData.user.id;

  //Select the user's profile uploads table
  const { data: userUploads } = await supabase
    .from("profiles")
    .select("uploads")
    .eq("id", userId)
    .single();

  //Provide assigned upload media ID and fetch the media from Giphy API
  const uploadedMediaResult = await fetch(
    `${process.env.SITE_URL}/api/get-gif?gifId=${data.data.id}`
  );
  const { data: media }: { data: Gif | Sticker } =
    await uploadedMediaResult.json();

  //Update users uploaded gifs table
  if (media.type === "gif") {
    //Updated uploaded gifs array
    const updatedGifs = [...userUploads?.uploads.gifs, media];

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        uploads: { gifs: updatedGifs, stickers: userUploads?.uploads.stickers },
      })
      .eq("id", userId)
      .single();

    console.log("Gif saved to profile");

    if (updateError) {
      return {
        success: false,
        data: null,
        error: `Error updating collection, ${updateError}`,
        status: 500,
      };
    }
  }
  //Update users uploaded stickers table
  if (media.type === "sticker") {
    //Updated uploaded stickers array
    const updatedStickers = [...userUploads?.uploads.stickers, media];

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        uploads: { gifs: userUploads?.uploads.gifs, stickers: updatedStickers },
      })
      .eq("id", userId)
      .single();

    console.log("Sticker saved to profile");

    if (updateError) {
      return {
        success: false,
        data: null,
        error: `Error updating collection, ${updateError}`,
        status: 500,
      };
    }
  }

  return {
    success: true,
    data: media,
    error: null,
    status: 200,
  };
}
