"use client";

import React from "react";
import Image from "next/image";

//Styles
import styles from "./MediaOverlay.module.scss";

//Icons
import { FaCopy } from "react-icons/fa";

//Utils
import { copyToClipboard } from "@/utils/utils";

//Animations
import { motion } from "framer-motion";
import { overlayAnimation } from "@/styles/animations";

//Interfaces
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";

//Components
import FavouriteButtonLoggedOut from "./FavouriteButtonLoggedOut/FavouriteButtonLoggedOut";
import { createClient } from "@/utils/supabase/client";
import FavouriteButtonLoggedIn from "./FavouriteButtonLoggedIn/FavouriteButtonLoggedIn";
import { useAuth } from "@/context/AuthContext";

interface IProps {
  media: Gif | Sticker;
}

const MediaOverlay: React.FC<IProps> = ({ media }) => {
  const user = useAuth();
  console.log(user);

  return (
    <motion.div
      className={styles.overlay}
      variants={overlayAnimation}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <div className={styles.overlay_icons}>
        <FaCopy
          className={styles.icon}
          onClick={() => copyToClipboard(media.images.original.url)}
        />

        <FavouriteButtonLoggedOut media={media} />
        <FavouriteButtonLoggedIn media={media} />
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
