import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import { useAuth } from "@/context/AuthContext";
import React, { useActionState, useEffect } from "react";

//Icons
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

//Styles
import styles from "./ChangeDetailsForm.module.scss";
import Button from "@/components/UI/Button";
import { changeUserDetails } from "@/actions/changeUserDetails";
import toast from "react-hot-toast";
import { toastStyle } from "@/styles/toast";

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
  const { user, email, username, fetchUser } = useAuth();
  console.log(user);

  const [state, formAction, isPending] = useActionState(
    changeUserDetails,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      fetchUser();
    }
  }, [state.success, state.resetKey]);

  useEffect(() => {
    if (state.success) {
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
