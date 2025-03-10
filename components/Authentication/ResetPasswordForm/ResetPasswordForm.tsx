"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

//Icons
import { RiLockPasswordFill } from "react-icons/ri";

//Components
import Button from "@/components/UI/Button";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Error from "../Error/Error";

//Styles
import styles from "./ResetPasswordForm.module.scss";

//Utils
import { createClient } from "@/utils/supabase/client";
import { updatePasswordSchema } from "@/utils/authValidation";
import { normalizeErrors } from "@/utils/authHelpers";
import toast from "react-hot-toast";
import { toastStyle } from "@/styles/toast";

const ResetPasswordForm: React.FC = () => {
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string[]>([]);

  const [message, setMessage] = useState<string | null>(null);

  const [isPending, setIsPending] = useState<boolean>(false);

  //After clicking the link in the email, the token is passed as a query parameter
  //We need a token to authenticate the user
  const searchParams = useSearchParams();
  const token = searchParams.get("code");
  //Using supabase client, not server
  const supabase = createClient();

  // Function to clear the error when user focuses on an input
  const handleFocus = () => {
    setError([]);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    if (!token) {
      setError(["Invalid or missing reset token."]);
      setIsPending(false);
      return;
    }

    const validateSignupData = updatePasswordSchema.safeParse(data);

    if (!validateSignupData.success) {
      const normalizedErrors = normalizeErrors(
        validateSignupData.error.format()
      );
      setError(normalizedErrors);
      setIsPending(false);
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setError(["Passwords do not match"]);
      setIsPending(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: data.newPassword,
    });

    if (error) {
      setIsPending(false);
      setError([error.message]);
    }

    setIsPending(false);
    setMessage("Password updated successfully");
    toast.success("Password updated successfully", toastStyle);
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <h3>Reset password</h3>

      {/* {message ? (
        <>
          <p>{message}</p>
          <Link href="/login">
            <Button active>Login</Button>
          </Link>
        </>
      ) : ( */}
      <>
        <p>Enter your new password</p>

        <Form onSubmit={handleUpdatePassword}>
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
            onChange={(e) => setData({ ...data, newPassword: e.target.value })}
            value={data.newPassword}
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
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            value={data.confirmPassword}
          />

          {error.length > 0 && <Error key="error" error={error} />}

          <Button active type="submit" disabled={isPending || message !== null}>
            {isPending ? "Updating password" : "Update password"}
          </Button>
        </Form>
      </>
      {/* )} */}
    </div>
  );
};

export default ResetPasswordForm;
