import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

//Animations
import { motion } from "framer-motion";
//Styles
import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  theme: "light" | "dark";
  onClose?: () => void;
}

const modalBackdropVariants = {
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

const modalVariants = {
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

const Modal: React.FC<ModalProps> = ({ children, theme, onClose }) => {
  // --- Portal Setup ---
  const [isMounted, setIsMounted] = useState(false);
  const modalRootRef = useRef<HTMLElement | null>(null);

  const innerModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    let portalNode = document.getElementById("modal-root");
    if (!portalNode) {
      portalNode = document.createElement("div");
      portalNode.id = "modal-root";
      document.body.appendChild(portalNode);
    }
    modalRootRef.current = portalNode;
  }, []);
  // --- End Portal Setup ---

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        onClose &&
        innerModalRef.current &&
        !innerModalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isMounted) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMounted, onClose]);

  const modalMarkup = (
    <motion.div
      className={styles.modalContainer}
      variants={modalBackdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        ref={innerModalRef}
        className={`${styles.modal} ${styles[theme]}`}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </motion.div>
  );

  // --- Conditional Portal Rendering ---
  // Render nothing during SSR or before mount/target is ready
  if (!isMounted || !modalRootRef.current /*|| !isOpen */) {
    // Add !isOpen check if using prop
    return null;
  }

  // Render into the portal target node
  return createPortal(modalMarkup, modalRootRef.current);
  // --- End Conditional Portal Rendering ---
};

export default Modal;
