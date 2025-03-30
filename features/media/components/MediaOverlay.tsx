"use client";

import React, { useState } from "react";
import Image from "next/image";

//Styles
import styles from "./MediaOverlay.module.scss";

//Icons
import { TfiSharethis } from "react-icons/tfi";

//Animations
import { motion } from "framer-motion";
import { overlayAnimation } from "@/styles/animations";

//Components
import FavouriteButton from "@/features/favourites/components/FavouriteButton";
import CollectionButton from "@/features/collections/components/CollectionButton";
import ShareMedia from "./ShareMedia";

//Context
import { useAuth } from "@/context/AuthContext";
import { useCollections } from "@/context/CollectionsProvider";

const MediaOverlay: React.FC = () => {
  const [shareContainer, setShareContainer] = useState(false);

  const { media } = useCollections();

  const user = useAuth();

  return (
    <motion.div
      className={styles.overlay}
      variants={overlayAnimation}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <div className={styles.overlayIconsContainer}>
        {shareContainer && <ShareMedia />}

        <div className={styles.addToFavouritesButton}>
          {!user ? <FavouriteButton /> : <CollectionButton />}
        </div>

        <div className={styles.shareButton}>
          <TfiSharethis
            className={styles.icon}
            onClick={() => setShareContainer(true)}
          />
        </div>
      </div>

      {media && media.user?.display_name && (
        <div className={styles.overlay_author}>
          <Image
            className={styles.avatar}
            src={media.user?.avatar_url}
            alt={media.user?.display_name}
            width={30}
            height={30}
          />
          <p className={styles.name}>{media.user?.display_name}</p>
        </div>
      )}
    </motion.div>
  );
};

export default MediaOverlay;
