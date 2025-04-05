import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

//Providers
import { useAuth } from "@/providers/AuthProvider";
//Icons
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
//Components
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Error from "@/features/auth/components/AuthError";
//Styles
import styles from "./ChangeDetailsForm.module.scss";
import { toastStyle } from "@/styles/toast";
//Actions
import { changeUserDetails } from "@/features/user/lib/actions/changeUserDetails";
//Utils
import { normalizeErrors } from "@/features/auth/utils/authHelpers";
//Supabase
import { createClient } from "@/utils/supabase/client";
//Types
import { ChangeDetailsFormState } from "@/features/user/types/forms";

const initialState: ChangeDetailsFormState = {
  data: { email: "", username: "" },
  error: null,
  success: false,
  resetKey: Date.now(),
};

const ChangeDetailsForm: React.FC = () => {
  const { user, email, username, fetchUser } = useAuth();

  const [error, setError] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(
    changeUserDetails,
    initialState
  );

  const handleResendEmail = async () => {
    const supabase = createClient();
    await supabase.auth.resend({
      type: "email_change",
      email: email,
    });
  };

  useEffect(() => {
    if (state.error) {
      const normalizedErrors = normalizeErrors(state.error);
      setError(normalizedErrors);
    }
  }, [state.error, state.resetKey]);

  useEffect(() => {
    if (state.success) {
      fetchUser();
      toast.success("Details updated successfully", {
        duration: 4000,
        style: toastStyle.style,
        iconTheme: toastStyle.iconTheme,
      });
    }
  }, [state.success, state.resetKey, fetchUser]);

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Account details</h1>

      <Form action={formAction}>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>Email</h3>
          <Input
            id="email"
            type="email"
            label="Email"
            defaultValue={email}
            labelHidden
            icon={<MdEmail />}
          />
        </div>
        {user?.new_email && user?.email !== user?.new_email && (
          <>
            <div className={styles.confirmEmail}>
              <p className={styles.confirmEmailText}>
                <MdOutlineError className={styles.icon} />
                <span>
                  You need to confirm your new email before you can use it.
                  We`ve sent you a confirmation email to your new email address.
                </span>
              </p>
              <Button onClick={handleResendEmail} variant="light">
                {isPending ? "Sending email..." : "Resend email"}
              </Button>
            </div>
          </>
        )}
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>Username</h3>
          <Input
            id="username"
            type="text"
            label="Username"
            defaultValue={username}
            labelHidden
            icon={<FaUser />}
          />
        </div>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}></h3>

          {error.length > 0 && <Error key="error" error={error} />}

          <Button
            className={styles.submitButton}
            variant="light"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save details"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangeDetailsForm;
