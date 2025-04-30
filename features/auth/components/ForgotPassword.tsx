"use client";
import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";

//Components
import Button from "@/shared/components/UI/Button";
import Input from "@/shared/components/UI/Input";
import Form from "@/shared/components/UI/Form";
import Error from "./AuthError";
//Icons
import { MdEmail } from "react-icons/md";
import { IoSend } from "react-icons/io5";
//Styles
import styles from "./ForgotPassword.module.scss";
//Utils
import { forgotPassword } from "@/features/auth/lib/actions/forgotPassword";
import { normalizeErrors } from "@/features/auth/utils/authHelpers";
//Types
import { ForgotPasswordFormState } from "../types/forms";

const initialState: ForgotPasswordFormState = {
  data: { email: "" },
  error: null,
  success: false,
  status: 0,
  message: "",
  resetKey: Date.now(),
};

const ForgotPassword: React.FC = () => {
  const [error, setError] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(
    forgotPassword,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      const normalizedErrors = normalizeErrors(state.error);
      setError(normalizedErrors);
    }
  }, [state.error]);

  const getEmailProviderUrl = () => {
    const domain = state.data.email.split("@")[1];
    switch (domain) {
      case "gmail.com":
        return "https://mail.google.com/";
      case "yahoo.com":
        return "https://mail.yahoo.com/";
      case "outlook.com":
      case "hotmail.com":
      case "live.com":
        return "https://outlook.live.com/";
      default:
        return "mailto:${email}"; //If there is no match, return dafault provider
    }
  };

  // Function to clear the error when user focuses on an input
  const handleFocus = () => {
    setError([]);
  };

  if (state.success)
    return (
      <div className={styles.forgotPasswordContainer}>
        <h3 className={styles.title}>Forgot password</h3>
        <div className={styles.formSuccess}>
          <p>
            Check your inbox — we`ve sent you a magic link to reset your
            password.
          </p>
          <Link href={getEmailProviderUrl()}>
            <Button className={styles.submitButton} variant="dark">
              Open inbox
            </Button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className={styles.forgotPasswordContainer}>
      <h3 className={styles.title}>Forgot password</h3>

      <p>
        Enter your email address and we`ll send you a magic link to reset your
        password.
      </p>
      <Form action={formAction}>
        <Input
          id="email"
          label="email"
          labelHidden
          type="email"
          placeholder="Email"
          icon={<MdEmail />}
          required
          onFocus={handleFocus}
        />
        <Button
          active
          type="submit"
          className={styles.submitButton}
          icon={<IoSend />}
          iconPosition="right"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send"}
        </Button>

        {error.length > 0 && <Error error={error} />}
      </Form>
    </div>
  );
};

export default ForgotPassword;
