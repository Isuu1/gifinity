import React from "react";

//Animations
import { motion } from "framer-motion";
import { modalAnimation, modalBackdropAnimation } from "@/styles/animations";

//Styles
import styles from "./Modal.module.scss";

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
