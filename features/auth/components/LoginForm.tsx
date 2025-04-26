"use client";

import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

//Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import AuthError from "./AuthError";
import AuthProviders from "./AuthProviders";

//Icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { IoSend } from "react-icons/io5";
//Styles
import styles from "./LoginForm.module.scss";
import { toastStyle } from "@/shared/styles/toast";

//Utils
import { login } from "@/features/auth/actions/auth";

//Types
import { LoginFormState } from "../types/forms";

const initialState: LoginFormState = {
  error: null,
  success: false,
  data: { email: "", password: "" },
  status: 0,
  resetKey: Date.now(),
};

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState(false);

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

  //Redirect to home page and show success message when user is logged in
  useEffect(() => {
    if (state.success) {
      toast.success(
        "Welcome back! Ready to explore more GIFs and stickers?",
        toastStyle
      );
      setTimeout(() => {
        window.location.pathname = "/";
      }, 1000);
    }
  }, [state]);

  return (
    <div className={styles.loginFormContainer}>
      <h3 className={styles.loginFormDescription}>
        Access your favorites, sync across devices, and more!
      </h3>

      <Form action={formAction}>
        <Input
          type="email"
          id="email"
          label="Email"
          required
          disabled={isPending}
          labelHidden
          placeholder="Email"
          icon={<MdEmail />}
          onFocus={handleFocus}
        />
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          label="Password"
          required
          disabled={isPending}
          labelHidden
          placeholder="Password"
          icon={<RiLockPasswordFill />}
          showPasswordIcon={
            showPassword ? (
              <IoMdEye onClick={() => setShowPassword(false)} />
            ) : (
              <IoMdEyeOff onClick={() => setShowPassword(true)} />
            )
          }
          onFocus={handleFocus}
        />
        {/* Passing userEmail to Error component for handling resend email confirmation  */}
        {error.length > 0 && (
          <AuthError key="error" error={error} userEmail={state.data.email} />
        )}

        <Button
          variant="light"
          type="submit"
          disabled={isPending}
          className={styles.loginButton}
          icon={<IoSend />}
          iconPosition="right"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </Form>

      {/* <Link href="forgot-password">
        <h4>Forgot your password?</h4>
      </Link> */}

      <h4>——— or ———</h4>

      <AuthProviders />
    </div>
  );
};

export default LoginForm;
