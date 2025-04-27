"use client";

import React from "react";

//Icons
import { FaHeartCirclePlus } from "react-icons/fa6";
//Animations
import { motion } from "motion/react";
//Styles
import styles from "./CollectionButton.module.scss";

interface CollectionButtonProps {
  openModal: () => void;
}

const CollectionButton: React.FC<CollectionButtonProps> = ({ openModal }) => {
  return (
    <button className={styles.collectionButton}>
      <motion.i whileTap={{ scale: 1.6 }} transition={{ duration: 0.2 }}>
        <FaHeartCirclePlus className={styles.icon} onClick={openModal} />
      </motion.i>
    </button>
  );
};

export default CollectionButton;
