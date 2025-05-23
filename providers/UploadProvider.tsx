"use client";

import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";
import { createClient } from "@/supabase/client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UploadContextType {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileUrl: string | null;
  setFileUrl: React.Dispatch<React.SetStateAction<string | null>>;
  uploads: { gifs: Gif[]; stickers: Sticker[] };
  fetchUploads: () => void;
  isLoading: boolean;
}

export const UploadContext = createContext<UploadContextType | null>(null);

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploads, setUploads] = useState({ gifs: [], stickers: [] });

  const supabase = createClient();

  //Fetch uploads from user profile

  const fetchUploads = async () => {
    setIsLoading(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        console.error("Error fetching user:", authError);
        return;
      }

      // Fetch the user's profile data from the Profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("uploads")
        .eq("id", authData.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile data:", profileError);
        return;
      }
      setUploads(profileData.uploads);
    } catch (error) {
      console.error("Error in fetchUploads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  return (
    <UploadContext.Provider
      value={{
        file,
        setFile,
        fileUrl,
        setFileUrl,
        uploads,
        fetchUploads,
        isLoading,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
};
