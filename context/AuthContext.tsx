"use client";

import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  username: string | "";
  email: string | "";
  avatar: string | "";
  favouriteGifs: { data: Gif[] };
  favouriteStickers: { data: Sticker[] };
  fetchUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //This represents the user object coming from auth table, it is used only for authentication purposes
  //It is not used to store user data, for that we use the profiles table
  const [user, setUser] = useState<User | null>(null);
  //This represents the user data stored in the profiles table
  const [username, setUsername] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [avatar, setAvatar] = useState<string | "">("");
  const [favouriteGifs, setFavouriteGifs] = useState({ data: [] });
  const [favouriteStickers, setFavouriteStickers] = useState({ data: [] });

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
      .select("email, username, avatar, favourite_gifs, favourite_stickers")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile data:", profileError);
      return;
    }

    setUser(authData.user);
    setUsername(profileData?.username);
    setEmail(profileData?.email);
    setAvatar(profileData?.avatar);
    setFavouriteGifs(profileData?.favourite_gifs || []);
    setFavouriteStickers(profileData?.favourite_stickers || []);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        username,
        email,
        avatar,
        favouriteGifs,
        favouriteStickers,
        fetchUser,
      }}
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
