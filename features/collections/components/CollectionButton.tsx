"use client";

import React from "react";

//Icons
import { FaHeartCirclePlus } from "react-icons/fa6";

//Animations
import { motion } from "framer-motion";

//Styles
import styles from "./CollectionButton.module.scss";

//Components
import { useCollections } from "@/context/CollectionsProvider";

const CollectionButton: React.FC = () => {
  const { setCollectionsModalOpen } = useCollections();

  return (
    <>
      <motion.div
        whileTap={{ scale: 1.6 }} // Apply scale animation on tap
        transition={{ duration: 0.2 }}
      >
        <FaHeartCirclePlus
          className={styles.icon}
          onClick={() => setCollectionsModalOpen(true)}
        />
      </motion.div>
    </>
  );
};

export default CollectionButton;
