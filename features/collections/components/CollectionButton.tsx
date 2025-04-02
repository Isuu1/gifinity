"use client";

import React from "react";

//Icons
import { FaHeartCirclePlus } from "react-icons/fa6";
//Animations
import { AnimatePresence, motion } from "framer-motion";
//Styles
import styles from "./CollectionButton.module.scss";
//Components
import CollectionsModal from "./CollectionsModal";
//Hooks
import { useCollections } from "@/context/CollectionsProvider";

const CollectionButton: React.FC = () => {
  const { collectionsModalOpen, setCollectionsModalOpen } = useCollections();

  return (
    <>
      <AnimatePresence>
        {collectionsModalOpen && <CollectionsModal />}
      </AnimatePresence>
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
