"use client";

import React from "react";
import Image from "next/image";

//Styles
import styles from "./MediaOverlay.module.scss";
//Icons
import { TfiSharethis } from "react-icons/tfi";
//Animations
import { AnimatePresence, motion } from "motion/react";
//Components
import FavouriteButton from "@/features/favourites/components/FavouriteButton";
import CollectionButton from "@/features/collections/components/CollectionButton";
//Providers
import { useAuth } from "@/providers/AuthProvider";
import { useCollections } from "@/providers/CollectionsProvider";
import CollectionsModal from "@/features/collections/components/CollectionsModal";
import ShareMedia from "./ShareMedia";
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";

const mediaOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

interface MediaOverlayProps {
  media: Gif | Sticker;
  showCollectionsModal: boolean;
  setShowCollectionsModal: React.Dispatch<React.SetStateAction<boolean>>;
  showShareModal: boolean;
  setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MediaOverlay: React.FC<MediaOverlayProps> = ({
  media,
  showCollectionsModal,
  setShowCollectionsModal,
  showShareModal,
  setShowShareModal,
}) => {
  //const { media } = useCollections();

  const user = useAuth();

  return (
    <motion.div
      className={styles.overlay}
      variants={mediaOverlayVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <AnimatePresence>
        {showCollectionsModal && (
          <CollectionsModal
            media={media}
            closeModal={() => setShowCollectionsModal(false)}
          />
        )}
        {showShareModal && (
          <ShareMedia
            media={media}
            closeModal={() => setShowShareModal(false)}
          />
        )}
      </AnimatePresence>
      <div className={styles.overlayIconsContainer}>
        {!user.user ? (
          <FavouriteButton />
        ) : (
          <CollectionButton openModal={() => setShowCollectionsModal(true)} />
        )}

        <button className={styles.shareButton}>
          <TfiSharethis
            className={styles.icon}
            onClick={() => setShowShareModal(true)}
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
