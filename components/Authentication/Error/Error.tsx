import React from "react";

//Styles
import styles from "./Error.module.scss";

//Components
import Button from "@/components/UI/Button";

//Animations
import { motion } from "framer-motion";
import { errorAnimation } from "@/styles/animations";

//Icons
import { MdOutlineError } from "react-icons/md";

//Utils
import { resendConfirmation } from "@/utils/authHelpers";

interface IProps {
  error: string[];
  userEmail?: string;
}

const Error: React.FC<IProps> = ({ error, userEmail }) => {
  const handleResendeEmailConfirmation = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!userEmail) return;
    const result = await resendConfirmation(userEmail);
    if (result.error) {
      console.error(result.error);
    }
    if (result.success) {
      console.log(result.success);
    }
  };

  const displayError = error.map((err, index) => {
    switch (err) {
      case "Email not confirmed":
        return (
          <>
            <p className={styles.errorMessage}>
              <MdOutlineError className={styles.icon} />
              <span>Your email is not confirmed. Please check your inbox.</span>
            </p>
            <Button variant="dark" onClick={handleResendeEmailConfirmation}>
              Resend email
            </Button>
          </>
        );

      default:
        return (
          <p key={index} className={styles.errorMessage}>
            <MdOutlineError className={styles.icon} /> <span>{err}</span>
          </p>
        );
    }
  });

  return (
    <motion.div
      className={styles.errorContainer}
      variants={errorAnimation}
      initial="hidden"
      animate="visible"
    >
      {displayError}
    </motion.div>
  );
};

export default Error;
