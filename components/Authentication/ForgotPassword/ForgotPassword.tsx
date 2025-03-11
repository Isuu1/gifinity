"use client";
import React, { useActionState, useEffect, useState } from "react";

//Components
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Form from "@/components/UI/Form";
import Error from "../Error/Error";
import SignupSuccess from "../SignupSuccess/SignupSuccess";

//Icons
import { MdEmail } from "react-icons/md";

//Styles
import styles from "./ForgotPassword.module.scss";

//Utils
import { forgotPassword } from "@/actions/auth";
import { normalizeErrors } from "@/utils/authHelpers";

const ForgotPassword: React.FC = () => {
  const initialState = {
    error: null,
    success: "",
    data: { email: "" },
  };

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

  // Function to clear the error when user focuses on an input
  const handleFocus = () => {
    setError([]);
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <h3>Reset password</h3>

      {state.success ? (
        <SignupSuccess
          email={state.data.email}
          successMessage={state.success}
        />
      ) : (
        <>
          <p>Enter your email address to reset your password.</p>
          <Form action={formAction}>
            <Input
              id="email"
              label="email"
              labelHidden
              type="email"
              theme="white"
              placeholder="Email"
              icon={<MdEmail />}
              required
              onFocus={handleFocus}
            />
            <Button active type="submit">
              {isPending ? "Sending..." : "Send"}
            </Button>

            {error.length > 0 && <Error error={error} />}
          </Form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
