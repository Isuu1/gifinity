"use client";

import { createClient } from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  username: string | "";
  email: string | "";
  avatar: string | "";
  fetchUser: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  //This represents the user object coming from auth table, it is used only for authentication purposes
  //It is not used to store user data, for that we use the profiles table
  const [user, setUser] = useState<User | null>(null);
  //This represents the user data stored in the profiles table
  const [username, setUsername] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [avatar, setAvatar] = useState<string | "">("");

  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData?.user) {
        if (authError && authError.message !== "user not found") {
          console.warn("Auth fetch warning:", authError.message);
        }
        setUser(null);
        setUsername("");
        setEmail("");
        setAvatar("");
        return;
      }
      setUser(authData.user);

      //Fetch the profile data from the profiles table using the user ID
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("email, username, avatar")
        .eq("id", authData.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile data:", profileError);
        setUsername("");
        setEmail("");
        setAvatar("");
        return;
      }
      setUsername(profileData?.username || "");
      setEmail(profileData?.email || "");
      setAvatar(profileData?.avatar || "");
    } catch (error) {
      console.error("Unexpected error fetching user data:", error);
      setUser(null);
      setUsername("");
      setEmail("");
      setAvatar("");
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        username,
        email,
        avatar,
        fetchUser,
        isLoading,
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
