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
  const { user } = useAuth();
  console.log(user);

  const [state, formAction, isPending] = useActionState(
    changeUserDetails,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      if (user?.email !== state.data.email) {
        toast.success("Email updated succesfuly", toastStyle);
      }
      if (user?.user_metadata.user_name !== state.data.username) {
        toast.success("Username updated succesfuly", toastStyle);
      }
    }
  }, [state.success, state.resetKey, state.data, user]);

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
            defaultValue={user?.email}
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
            defaultValue={user?.user_metadata.user_name}
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
