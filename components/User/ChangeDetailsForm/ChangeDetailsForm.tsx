import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

//Context
import { useAuth } from "@/context/AuthContext";

//Icons
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

//Components
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Error from "@/components/Authentication/Error/Error";

//Styles
import styles from "./ChangeDetailsForm.module.scss";
import { toastStyle } from "@/styles/toast";

//Utils
import { changeUserDetails } from "@/actions/changeUserDetails";
import { normalizeErrors } from "@/utils/authHelpers";

interface FormState {
  data: { email: string; username: string };
  error: string | null;
  success: boolean;
  resetKey: number;
}

const initialState: FormState = {
  data: { email: "", username: "" },
  error: null,
  success: false,
  resetKey: Date.now(),
};

const ChangeDetailsForm: React.FC = () => {
  const { email, username, fetchUser } = useAuth();

  const [error, setError] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(
    changeUserDetails,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      const normalizedErrors = normalizeErrors(state.error);
      setError(normalizedErrors);
    }
  }, [state.error, state.resetKey]);

  useEffect(() => {
    if (state.success) {
      fetchUser();
      toast.success("Details updated successfully", toastStyle);
    }
  }, [state.success, state.resetKey]);

  console.log(state);

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
            Save details
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangeDetailsForm;
