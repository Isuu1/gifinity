"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";

//Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import SignupSuccess from "./SignupSuccess";
import AuthError from "./AuthError";
import AuthProviders from "./AuthProviders";

//Icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

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
  data: { email: "", password: "", confirmPassword: "" },
  status: 0,
  resetKey: Date.now(),
};

const SignupForm: React.FC = () => {
  const [error, setError] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(signup, initialState);

  //Set error message whenever form state returns one
  useEffect(() => {
    if (state.error) {
      const normalizedErrors = normalizeErrors(state.error);
      setError(normalizedErrors);
    }
  }, [state.resetKey, state.error]);

  // Function to clear the error when user focuses on an input
  const handleFocus = () => {
    setError([]);
  };

  console.log("state", state);

  return (
    <div className={styles.signupFormContainer}>
      <h2>Signup</h2>

      {state.success ? (
        <SignupSuccess
          email={state.data.email}
          successMessage="Your account has been created!"
        />
      ) : (
        <>
          <h4>
            Create account to access your favorites, sync across devices, and
            more!
          </h4>

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
            >
              {isPending ? "Creating account..." : "Sign up"}
            </Button>
          </Form>

          <h4>——— or ———</h4>

          <AuthProviders />
        </>
      )}
    </div>
  );
};

export default SignupForm;
