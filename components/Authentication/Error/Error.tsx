import React from "react";

//Styles
import styles from "./Error.module.scss";
import Button from "@/components/UI/Button";

import { MdOutlineError } from "react-icons/md";
import { motion } from "framer-motion";

interface IProps {
  error: string[];
}

const errorAnimation = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const Error: React.FC<IProps> = ({ error }) => {
  const displayError = error.map((err, index) => {
    switch (err) {
      case "Email not confirmed":
        return (
          <>
            <p className={styles.errorMessage}>
              <MdOutlineError className={styles.icon} />
              <span>Your email is not confirmed. Please check your inbox.</span>
            </p>
            <Button>Resend email</Button>
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
