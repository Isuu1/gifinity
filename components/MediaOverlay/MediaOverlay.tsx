"use client";

import React from "react";
import Image from "next/image";

//Styles
import styles from "./MediaOverlay.module.scss";

//Icons
import { FaCopy } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

//Utils
import { copyToClipboard } from "@/utils/utils";
import { useStorage } from "@/context/StorageContext";

//Animations
import { motion } from "framer-motion";
import { overlayAnimation } from "@/styles/animations";

//Interfaces
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";

interface IProps {
  media: Gif | Sticker;
}

const MediaOverlay: React.FC<IProps> = ({ media }) => {
  const { localFavouriteGifs, localFavouriteStickers, addItemToLocalStorage } =
    useStorage();

  const isGifOnWishlist = localFavouriteGifs.data.find(
    (item) => item.id === media.id
  );
  const isStickerOnWishlist = localFavouriteStickers.data.find(
    (item) => item.id === media.id
  );

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

        <motion.div
          whileTap={{ scale: 1.6 }} // Apply scale animation on tap
          transition={{ duration: 0.2 }}
        >
          <FaHeart
            className={`${styles.icon} ${
              isGifOnWishlist || isStickerOnWishlist ? styles.filled : ""
            }`}
            onClick={() => addItemToLocalStorage(media)}
          />
        </motion.div>
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
