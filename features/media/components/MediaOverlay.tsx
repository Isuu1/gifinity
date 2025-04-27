"use client";

import React from "react";
import Image from "next/image";

//Styles
import styles from "./MediaOverlay.module.scss";

//Icons
import { TfiSharethis } from "react-icons/tfi";

//Animations
import { motion } from "framer-motion";
//import { overlayAnimation } from "@/styles/animations";

//Components
import FavouriteButton from "@/features/favourites/components/FavouriteButton";
import CollectionButton from "@/features/collections/components/CollectionButton";

//Context
import { useAuth } from "@/providers/AuthProvider";
import { useCollections } from "@/providers/CollectionsProvider";

const mediaOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

interface MediaOverlayProps {
  showShareContainer: boolean;
  setShowShareContainer: React.Dispatch<React.SetStateAction<boolean>>;
}

const MediaOverlay: React.FC<MediaOverlayProps> = ({
  setShowShareContainer,
}) => {
  const { media } = useCollections();

  const user = useAuth();

  return (
    <motion.div
      className={styles.overlay}
      variants={mediaOverlayVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <div className={styles.overlayIconsContainer}>
        {!user.user ? <FavouriteButton /> : <CollectionButton />}

        <button className={styles.shareButton}>
          <TfiSharethis
            className={styles.icon}
            onClick={() => setShowShareContainer(true)}
          />
        </button>
      </div>

      {media && (media.user?.display_name || media.user?.username) && (
        <div className={styles.overlay_author}>
          <Image
            className={styles.avatar}
            src={media.user?.avatar_url}
            alt={media.user?.display_name}
            width={30}
            height={30}
          />
          <p className={styles.name}>
            {media.user?.display_name || media.user?.username}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default MediaOverlay;
