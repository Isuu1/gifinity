"use client";

import { createClient } from "@/utils/supabase/client";
import { UserMetadata } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserMetadata | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserMetadata | null>(null);

  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data.user?.user_metadata);
    };
    fetchUser();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
