"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

//Components
import Button from "@/shared/components/UI/Button";
import Form from "@/shared/components/UI/Form";
import Input from "@/shared/components/UI/Input";
import AuthError from "./AuthError";
import AuthProviders from "./AuthProviders";
//Icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
//Styles
import styles from "./SignupForm.module.scss";
//Utils
import { signup } from "@/features/auth/actions/auth";
import { normalizeErrors } from "@/features/auth/utils/authHelpers";
//Types
import { SignupFormState } from "../types/forms";

const initialState: SignupFormState = {
  error: null,
  success: false,
  data: { email: "", username: "", password: "", confirmPassword: "" },
  status: 0,
  resetKey: Date.now(),
};

const SignupForm: React.FC = () => {
  const [error, setError] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(signup, initialState);

  const router = useRouter();

  //Set error message whenever form state returns one
  useEffect(() => {
    if (state.error) {
      const normalizedErrors = normalizeErrors(state.error);
      setError(normalizedErrors);
    }
  }, [state.resetKey, state.error]);

  useEffect(() => {
    //If signup is successful, redirect to success page with email as query param
    if (state.success) {
      router.push(`/signup/success?email=${state.data.email}`);
    }
  }, [state.success, router, state.data.email]);

  // Function to clear the error when user focuses on an input
  const handleFocus = () => {
    setError([]);
  };

  return (
    <div className={styles.signupFormContainer}>
      <h3 className={styles.signupFormDescription}>
        Create account to access your collections, sync across devices, and
        more!
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
          defaultValue={state.data?.email}
          onFocus={handleFocus}
        />
        <Input
          type="username"
          id="username"
          label="Username"
          required
          disabled={isPending}
          labelHidden
          placeholder="Username"
          icon={<FaUser />}
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
        <Input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          label="confirmPassword"
          required
          disabled={isPending}
          labelHidden
          placeholder="Confirm password"
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

        {error.length > 0 && <AuthError key="error" error={error} />}

        <Button
          variant="light"
          type="submit"
          disabled={isPending}
          className={styles.signupButton}
          icon={<IoSend />}
          iconPosition="right"
        >
          {isPending ? "Creating account..." : "Create account"}
        </Button>
      </Form>

      <h4>——— or ———</h4>

      <AuthProviders />
    </div>
  );
};

export default SignupForm;
