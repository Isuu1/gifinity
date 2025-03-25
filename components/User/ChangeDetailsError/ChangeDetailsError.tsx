import React from "react";

//Styles
import styles from "./ChangeDetailsError.module.scss";

//Animations
import { motion } from "framer-motion";
import { errorAnimation } from "@/styles/animations";

//Icons
import { MdOutlineError } from "react-icons/md";

interface IProps {
  message: string[];
}

const ChangeDetailsError: React.FC<IProps> = ({ message }) => {
  return (
    <motion.div
      className={styles.errorContainer}
      variants={errorAnimation}
      initial="hidden"
      animate="visible"
    >
      {message.map((error) => (
        <p key={error} className={styles.errorMessage}>
          <MdOutlineError className={styles.icon} /> <span>{error}</span>
        </p>
      ))}
    </motion.div>
  );
};

export default ChangeDetailsError;
