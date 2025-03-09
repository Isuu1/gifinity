"use client";

import React, { useActionState, useEffect, useState } from "react";

//Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Error from "../Error/Error";

//Icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";

//Styles
import styles from "./LoginForm.module.scss";

//Utils
import { login } from "@/actions/auth";

const LoginForm: React.FC = () => {
  const initialState = {
    error: null,
    success: "",
    data: { email: "", password: "" },
  };

  const [error, setError] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(login, initialState);

  //Set error message whenever form state returns one
  useEffect(() => {
    if (state.error) {
      setError([state.error]);
    }
  }, [state.resetKey, state.error]);

  // Function to clear the error when user focuses on an input
  const handleFocus = () => {
    setError([]);
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2>Log in to Gifinity</h2>
      <h4>Access your favorites, sync across devices, and more!</h4>

      <Form action={formAction}>
        <Input
          type="email"
          id="email"
          label="Email"
          required
          theme="white"
          labelHidden
          placeholder="Email"
          icon={<MdEmail />}
          onFocus={handleFocus}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          required
          theme="white"
          labelHidden
          placeholder="Password"
          icon={<RiLockPasswordFill />}
          onFocus={handleFocus}
        />
        {/* Passing userEmail to Error component for handling resend email confirmation  */}
        {error.length > 0 && (
          <Error key="error" error={error} userEmail={state.data.email} />
        )}

        <Button active>{isPending ? "Logging in..." : "Log in"}</Button>
      </Form>

      <h4>——— or ———</h4>

      <Button
        className={styles.loginWithGoogleButton}
        icon={<FcGoogle />}
        iconPosition="right"
      >
        Log in with Google
      </Button>
      <Button
        className={styles.loginWithFacebookButton}
        icon={<ImFacebook2 />}
        iconPosition="right"
      >
        Log in with Facebook
      </Button>
    </div>
  );
};

export default LoginForm;
