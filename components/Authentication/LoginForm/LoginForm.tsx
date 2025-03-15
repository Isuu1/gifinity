"use client";

import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

//Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Error from "../Error/Error";
import Providers from "../Providers/Providers";

//Icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

//Styles
import styles from "./LoginForm.module.scss";
import { toastStyle } from "@/styles/toast";

//Utils
import { login } from "@/actions/auth";

const LoginForm: React.FC = () => {
  const initialState = {
    error: null,
    success: "",
    data: { email: "", password: "" },
  };

  const [error, setError] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(login, initialState);

  const router = useRouter();

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
      toast.success(state.success, toastStyle);
      router.push("/");
    }
  }, [state, router]);

  return (
    <div className={styles.loginFormContainer}>
      <h2>Login</h2>
      <h4>Access your favorites, sync across devices, and more!</h4>

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
          <Error key="error" error={error} userEmail={state.data.email} />
        )}

        <Button
          variant="light"
          type="submit"
          disabled={isPending}
          className={styles.loginButton}
        >
          {isPending ? "Logging in..." : "Log in"}
        </Button>
      </Form>

      {/* <Link href="forgot-password">
        <h4>Forgot your password?</h4>
      </Link> */}

      <h4>——— or ———</h4>

      <Providers />
    </div>
  );
};

export default LoginForm;
