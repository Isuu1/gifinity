"use client";

import React from "react";

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
  const { localFavouriteGifs, localFavouriteStickers, addItem } = useStorage();

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
      <div className={styles.overlay_element}>
        <FaCopy
          className={styles.icon}
          onClick={() => copyToClipboard(media.images.original.url)}
        />
        <FaHeart
          className={`${styles.icon} ${
            isGifOnWishlist || isStickerOnWishlist ? styles.filled : ""
          }`}
          onClick={() => addItem(media)}
        />
      </div>
      {/* {gif.user?.display_name && (
                  <div className={styles.overlay_element}>
                    <p className={styles.overlayText}>
                      {gif.user?.display_name}
                    </p>
                    <Image
                      className={styles.avatar}
                      src={gif.user?.avatar_url}
                      alt={gif.user?.display_name}
                      width={30}
                      height={30}
                    />
                  </div>
                )} */}
    </motion.div>
  );
};

export default MediaOverlay;
