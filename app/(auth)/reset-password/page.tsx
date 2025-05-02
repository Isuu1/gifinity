"use client";
import { useEffect } from "react";

//Components
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
//Providers
import { useAuth } from "@/providers/AuthProvider";
//Supabase
import { createClient } from "@/supabase/client";

export default function Page() {
  const { fetchUser } = useAuth();

  useEffect(() => {
    const supabase = createClient();
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("event", event);
      console.log("session", session);
    });
    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    return () => {
      const supabase = createClient();
      //Sign out user if he leave this page
      supabase.auth.signOut();
      fetchUser();
    };
  }, []);

  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
}
