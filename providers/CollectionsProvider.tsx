"use client";

import { Collection } from "@/features/collections/types/collection";
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";
import { createClient } from "@/supabase/client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface CollectionsContextType {
  collections: Collection[];
  fetchCollections: () => void;
  //media: Gif | Sticker | null;
  //setMedia: React.Dispatch<React.SetStateAction<Gif | Sticker | null>>;
  //collectionsModalOpen: boolean;
  //setCollectionsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollectionsContext = createContext<CollectionsContextType | null>(
  null
);

export const CollectionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collections, setCollections] = useState<Collection[]>([]);

  //const [media, setMedia] = useState<Gif | Sticker | null>(null);

  // const [collectionsModalOpen, setCollectionsModalOpen] =
  //   useState<boolean>(false);

  const supabase = createClient();

  const fetchCollections = useCallback(async () => {
    // Fetch the authenticated user from the Auth table
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
      console.error("Error fetching user:", authError);
      return;
    }

    // Fetch the user's profile data from the Profiles table
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("collections")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile data:", profileError);
      return;
    }

    setCollections(profileData.collections);
  }, [supabase]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        fetchCollections,
        //media,
        //setMedia,
        //collectionsModalOpen,
        //setCollectionsModalOpen,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error("useCollections must be used within a CollectionsProvider");
  }
  return context;
};
