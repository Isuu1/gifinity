import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

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
    <Form>
      <div className={styles.inputContainer}>
        <h3>Email</h3>

        <Input
          label="Email"
          defaultValue={user?.email}
          labelHidden
          icon={<MdEmail />}
        />
      </div>

      <div className={styles.inputContainer}>
        <h3>Username</h3>

        <Input
          label="Username"
          value={user?.user_metadata.user_name}
          labelHidden
          icon={<FaUser />}
        />
      </div>
      <Button className={styles.submitButton} variant="light" type="submit">
        Save details
      </Button>
    </Form>
  );
};

export default ChangeDetailsForm;
