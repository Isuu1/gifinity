import React from "react";

//Animations
import { motion } from "framer-motion";

//Styles
import styles from "./Modal.module.scss";

export const modalBackdropAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const modalAnimation = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

interface IProps {
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ children }) => {
  return (
    <motion.div
      className={styles.modalContainer}
      variants={modalBackdropAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className={styles.modal}
        variants={modalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
