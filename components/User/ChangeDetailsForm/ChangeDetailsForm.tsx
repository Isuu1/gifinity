import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import { useAuth } from "@/context/AuthContext";
import React from "react";

//Icons
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

//Styles
import styles from "./ChangeDetailsForm.module.scss";
import Button from "@/components/UI/Button";

const ChangeDetailsForm: React.FC = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Account details</h1>
      <Form>
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
            value={user?.user_metadata.user_name}
            labelHidden
            icon={<FaUser />}
          />
        </div>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}></h3>
          <Button className={styles.submitButton} variant="light" type="submit">
            Save details
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangeDetailsForm;
