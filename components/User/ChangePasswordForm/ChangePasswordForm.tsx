import React, { useState } from "react";

//Styles
import styles from "./ChangePasswordForm.module.scss";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";

//Icons
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from "@/components/UI/Button";

const ChangePasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Password</h1>
      <Form>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>Old password</h3>
          <Input
            id="old-password"
            type="password"
            label="Old password"
            labelHidden
            icon={<RiLockPasswordFill />}
            showPasswordIcon={
              showPassword ? (
                <IoMdEye onClick={() => setShowPassword(false)} />
              ) : (
                <IoMdEyeOff onClick={() => setShowPassword(true)} />
              )
            }
          />
        </div>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>New password</h3>
          <Input
            id="new-password"
            type="password"
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
          />
        </div>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}>Confirm password</h3>
          <Input
            id="confirm-password"
            type="password"
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
          />
        </div>
        <div className={styles.inputContainer}>
          <h3 className={styles.label}></h3>
          <Button className={styles.submitButton} variant="light" type="submit">
            Save password
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
