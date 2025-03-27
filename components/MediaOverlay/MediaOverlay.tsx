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

//Interfaces
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";

//Components
import FavouriteButtonLoggedOut from "./FavouriteButtonLoggedOut/FavouriteButtonLoggedOut";
import FavouriteButtonLoggedIn from "./FavouriteButtonLoggedIn/FavouriteButtonLoggedIn";
import ShareMedia from "../ShareMedia/ShareMedia";

//Context
import { useAuth } from "@/context/AuthContext";

interface IProps {
  media: Gif | Sticker;
}

const MediaOverlay: React.FC<IProps> = ({ media }) => {
  const [shareContainer, setShareContainer] = useState(false);

  const user = useAuth();
  console.log(media);

  return (
    <motion.div
      className={styles.overlay}
      variants={overlayAnimation}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <div className={styles.overlayIconsContainer}>
        {shareContainer && <ShareMedia url={media?.images.original.url} />}

        <div className={styles.addToFavouritesButton}>
          {user ? (
            <FavouriteButtonLoggedIn media={media} />
          ) : (
            <FavouriteButtonLoggedOut media={media} />
          )}
        </div>

        <div className={styles.shareButton}>
          <TfiSharethis
            className={styles.icon}
            onClick={() => setShareContainer(true)}
          />
        </div>
      </div>

      {media.user?.display_name && (
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
