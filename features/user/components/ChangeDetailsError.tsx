import React from "react";

//Styles
import styles from "./ChangeDetailsError.module.scss";
//Animations
import { motion } from "framer-motion";
//Icons
import { MdOutlineError } from "react-icons/md";

interface IProps {
  message: string[];
}

const errorVariants = {
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

const ChangeDetailsError: React.FC<IProps> = ({ message }) => {
  return (
    <motion.div
      className={styles.errorContainer}
      variants={errorVariants}
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
