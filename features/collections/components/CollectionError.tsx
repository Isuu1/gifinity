import React from "react";

//Icons
import { MdOutlineError } from "react-icons/md";
//Styles
import styles from "./CollectionError.module.scss";
//Animations
import { motion } from "motion/react";

interface IProps {
  error: string;
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

const CollectionError: React.FC<IProps> = ({ error }) => {
  return (
    <motion.div
      className={styles.errorContainer}
      variants={errorVariants}
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
