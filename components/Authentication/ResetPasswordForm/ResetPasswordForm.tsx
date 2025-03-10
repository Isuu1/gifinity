"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

//Icons
import { RiLockPasswordFill } from "react-icons/ri";

//Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Error from "../Error/Error";

//Utils
import { updatePassword } from "@/actions/auth";
import { normalizeErrors } from "@/utils/authHelpers";

const ResetPasswordForm: React.FC = () => {
  const initialState = {
    error: null,
    success: "",
    data: { email: "", password: "", confirmPassword: "" },
  };

  //After clicking the link in the email, the token is passed as a query parameter
  //We need a token to authenticate the user
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialState
  );

  const [error, setError] = useState<string[]>([]);

  //Set error message whenever form state returns one
  useEffect(() => {
    if (state.error) {
      setError(normalizeErrors(state.error));
    }
  }, [state.resetKey, state.error]);

  // Function to clear the error when user focuses on an input
  const handleFocus = () => {
    setError([]);
  };

  return (
    <div>
      <h2>Enter your new password</h2>

      <Form action={formAction}>
        <Input
          id="token"
          type="hidden"
          label="token"
          theme="white"
          value={token || ""}
          labelHidden
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
        <Input
          type="password"
          id="confirmPassword"
          label="confirmPassword"
          required
          theme="white"
          labelHidden
          placeholder="Confirm password"
          icon={<RiLockPasswordFill />}
          onFocus={handleFocus}
        />

        {error.length > 0 && <Error key="error" error={error} />}

        <Button active>
          {isPending ? "Updating password" : "Update password"}
        </Button>
      </Form>
      {state.success && <p>{state.success}</p>}
    </div>
  );
};

export default ResetPasswordForm;
