import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

//Styles
import styles from "./ChangePasswordForm.module.scss";
import { toastStyle } from "@/shared/styles/toast";
//Components
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import ChangeDetailsError from "@/features/user/components/ChangeDetailsError";
//Icons
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
//Utils
import { normalizeErrors } from "@/features/auth/utils/authHelpers";
//Actions
import { changeUserPassword } from "@/features/user/lib/actions/changeUserPassword";
//Types
import { ChangePasswordFormState } from "@/features/user/types/forms";

const initialState: ChangePasswordFormState = {
  data: { newPassword: "", confirmPassword: "" },
  error: null,
  success: false,
  resetKey: Date.now(),
};

const ChangePasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(
    changeUserPassword,
    initialState
  );

  // Function to clear the error when user focuses on an input
  const handleFocus = () => {
    setError([]);
  };

  //Set error message whenever form state returns one
  useEffect(() => {
    if (state.error) {
      const normalizedErrors = normalizeErrors(state.error);
      setError(normalizedErrors);
    }
  }, [state.resetKey, state.error]);

  useEffect(() => {
    if (state.success) {
      toast.success("Password updated successfully", {
        duration: 4000,
        style: toastStyle.style,
        iconTheme: toastStyle.iconTheme,
      });
      setError([]);
    }
  }, [state.success, state.resetKey]);

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Password</h1>
      <Form action={formAction}>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>New password</h3>
          <Input
            id="new-password"
            type={showPassword ? "text" : "password"}
            label="New password"
            labelHidden
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
        </div>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>Confirm password</h3>
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            label="Confirm password"
            labelHidden
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
        </div>

        {error.length > 0 && <ChangeDetailsError key="error" message={error} />}

        <div className={styles.inputContainer}>
          <h3 className={styles.label}></h3>
          <Button
            className={styles.submitButton}
            variant="light"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save password"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
