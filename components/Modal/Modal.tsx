import React from "react";

//Animations
import { motion } from "framer-motion";

//Styles
import styles from "./Modal.module.scss";

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
    <div className={styles.modalContainer}>
      <motion.div
        className={styles.modal}
        variants={modalAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
