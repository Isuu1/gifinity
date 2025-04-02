import React from "react";

//Icons
import { MdOutlineError } from "react-icons/md";

//Styles
import styles from "./CollectionError.module.scss";

//Animations
import { motion } from "motion/react";
import { errorAnimation } from "@/styles/animations";

interface IProps {
  error: string;
}

const CollectionError: React.FC<IProps> = ({ error }) => {
  return (
    <motion.div
      className={styles.errorContainer}
      variants={errorAnimation}
      initial="hidden"
      animate="visible"
    >
      <p className={styles.errorMessage}>
        <MdOutlineError className={styles.icon} />
        <span>{error}</span>
      </p>
    </motion.div>
  );
};

export default CollectionError;
