"use client";

import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";
import { createClient } from "@/utils/supabase/client";
import { UserMetadata } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserMetadata | null;
  favouriteGifs: { data: Gif[] };
  favouriteStickers: { data: Sticker[] };
  fetchUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserMetadata | null>(null);
  const [favouriteGifs, setFavouriteGifs] = useState({ data: [] }); // State for favourite GIFs
  const [favouriteStickers, setFavouriteStickers] = useState({ data: [] }); // State for favourite stickers

  const supabase = createClient();

  const fetchUser = async () => {
    // Fetch the authenticated user from the Auth table
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
      console.error("Error fetching user:", authError);
      return;
    }

    // Fetch the user's profile data from the Profiles table
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("favourite_gifs, favourite_stickers")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile data:", profileError);
      return;
    }

    setUser(authData.user?.user_metadata);
    setFavouriteGifs(profileData?.favourite_gifs || []);
    setFavouriteStickers(profileData?.favourite_stickers || []);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, favouriteGifs, favouriteStickers, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
