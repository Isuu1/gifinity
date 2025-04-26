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

  // Memoize fetchUser with useCallback
  const fetchUser = useCallback(async () => {
    // Indicate loading whenever this function is called
    setIsLoading(true);
    try {
      // Fetch the authenticated user from the Auth table
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      // If error or no user, clear all state and exit
      if (authError || !authData?.user) {
        if (authError && authError.message !== "user not found") {
          // Don't log expected "not found" as error
          console.warn("Auth fetch warning:", authError.message);
        }
        setUser(null);
        setUsername("");
        setEmail("");
        setAvatar("");
        // Keep isLoading true until finally block? Or set false here?
        // Setting false in finally is generally safer.
        return;
      }

      // User authenticated, set the user object immediately
      setUser(authData.user);

      // Fetch the user's profile data from the Profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("email, username, avatar")
        .eq("id", authData.user.id)
        .single();

      // If profile fetch fails, log error but keep auth user, clear profile fields
      if (profileError) {
        console.error("Error fetching profile data:", profileError);
        setUsername("");
        setEmail("");
        setAvatar("");
        return; // Exit after setting auth user but clearing profile
      }

      // Both fetches successful, set profile data
      setUsername(profileData?.username || ""); // Use fallbacks
      setEmail(profileData?.email || "");
      setAvatar(profileData?.avatar || "");
    } catch (error) {
      // Catch unexpected errors during the process
      console.error("Unexpected error fetching user data:", error);
      setUser(null); // Clear all state on unexpected errors
      setUsername("");
      setEmail("");
      setAvatar("");
    } finally {
      // Always set loading to false when done (success or error)
      setIsLoading(false);
    }
  }, [supabase]); // Dependency: fetchUser depends on the supabase client instance.

  // Initial fetch on mount
  useEffect(() => {
    fetchUser();
    // Now the dependency is stable, and ESLint is happy
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
