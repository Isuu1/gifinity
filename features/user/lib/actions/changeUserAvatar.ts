"use server";

import { createClient } from "@/utils/supabase/server";
import { generateUploadToken } from "./generate-upload-token";

export async function changeUserAvatar(formData: FormData) {
  try {
    const supabase = await createClient();

    //Get bucket from supabase storage
    const bucketName = "gifinity-avatars";

    // Variable to store the path of the old avatar
    let oldAvatarPath: string | null = null;

    // Get the authenticated user
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData.user) {
      return {
        success: false,
        error: "User not authenticated",
        resetKey: Date.now(),
      };
    }

    const userId = userData.user.id;

    //Check for old avatar to remove it is user upload a new one
    //Fetch current profile upload to get old avatar info
    const { data: currentProfile, error: profileFetchError } = await supabase
      .from("profiles")
      .select("avatar")
      .eq("id", userId)
      .single();

    if (profileFetchError) {
      return {
        success: false,
        error: `Failed to fetch current profile: ${profileFetchError.message}`,
        resetKey: Date.now(),
      };
    }

    const oldAvatarUrl = currentProfile?.avatar;

    //Try to extract the path from the old URL if it exists and belongs to our bucket
    if (oldAvatarUrl && oldAvatarUrl.includes(`/${bucketName}/`)) {
      try {
        // Basic path extraction: Get the part after '/bucketName/'
        const urlObject = new URL(oldAvatarUrl);
        const pathSegments = urlObject.pathname.split("/");
        // Find the index of the bucket name segment
        const bucketIndex = pathSegments.findIndex(
          (segment) => segment === bucketName
        );
        if (bucketIndex !== -1 && bucketIndex + 1 < pathSegments.length) {
          // Join segments after the bucket name, decode URL encoding
          oldAvatarPath = decodeURIComponent(
            pathSegments.slice(bucketIndex + 1).join("/")
          );
        } else {
          console.warn(
            "Could not accurately extract path from old URL:",
            oldAvatarUrl
          );
        }
      } catch (e) {
        console.error("Error parsing old avatar URL:", e);
        // Could not parse URL, proceed without deletion path
      }
    }

    //Get file from appended formData
    const file = formData.get("file") as File;

    if (!file) {
      return {
        success: false,
        error: "No file provided",
        resetKey: Date.now(),
      };
    }

    //Server-side file validation
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 1 * 1024 * 1024; // 1 MB

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Invalid file type.",
        resetKey: Date.now(),
      };
    }
    if (file.size > maxSize) {
      return {
        success: false,
        error: `File size exceeds ${maxSize / 1024 / 1024}MB limit.`,
        resetKey: Date.now(),
      };
    }

    //Generate unique filename
    const fileName = `${userId}/${Date.now()}-${file.name.replace(
      /\s+/g,
      "-"
    )}`;

    //Get fresh token from server action
    const { token } = await generateUploadToken();

    if (!token) {
      console.error("Token Generation Error:");
      return {
        success: false,
        error: "Failed to generate upload token.",
        resetKey: Date.now(),
      };
    }

    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("gifinity-avatars")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
        headers: {
          Authorization: `Bearer ${token}`,
          "x-upsert": "false",
        },
      });

    if (uploadError) {
      return {
        success: false,
        error: `Upload failed: ${uploadError.message}`,
        resetKey: Date.now(),
      };
    }

    //Get Public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("gifinity-avatars").getPublicUrl(fileName);

    if (!publicUrl) {
      // This shouldn't typically happen if upload succeeded, but good to check
      return {
        success: false,
        error: "Failed to get public URL after upload.",
        resetKey: Date.now(),
      };
    }

    //Update user's profile
    const { error: updateError } = await supabase
      .from("profiles") // Ensure table name is correct
      .update({ avatar: publicUrl })
      .eq("id", userId);

    if (updateError) {
      //If update fails remove the uploaded file
      await supabase.storage.from("gifinity-avatars").remove([fileName]);
      return {
        success: false,
        error: `Failed to update profile: ${updateError.message}`,
        resetKey: Date.now(),
      };
    }

    //If profile update succeeded, delete the OLD avatar
    if (oldAvatarPath) {
      // Perform deletion in a separate try/catch block so its failure doesn't break the success response
      try {
        const { error: deleteError } = await supabase.storage
          .from(bucketName)
          .remove([oldAvatarPath]); // Pass the extracted path in an array

        if (deleteError) {
          // Log failure to delete, but don't treat it as a failure of the upload action itself
          console.warn(
            `Failed to delete old avatar (${oldAvatarPath}):`,
            deleteError.message
          );
        }
      } catch (deleteCatchError) {
        console.error("Error during old avatar deletion:", deleteCatchError);
      }
    }

    //Successful upload and profile update
    return {
      success: true,
      error: null,
      resetKey: Date.now(),
    };
  } catch (error) {
    return {
      success: false,
      error: error || "An unexpected error occurred.",
      resetKey: Date.now(),
    };
  }
}
