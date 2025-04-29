"use client";

import Button from "@/shared/components/UI/Button";
import React from "react";

//Icons
import { FcGoogle } from "react-icons/fc";

//Styles
import styles from "./AuthProviders.module.scss";
//Supabase
import { createClient } from "@/supabase/client";

const Providers: React.FC = () => {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  return (
    <div className={styles.providersContainer}>
      <Button
        className={styles.loginWithGoogleButton}
        icon={<FcGoogle />}
        iconPosition="right"
        onClick={handleGoogleLogin}
      >
        Log in with Google
      </Button>
    </div>
  );
};

export default Providers;
