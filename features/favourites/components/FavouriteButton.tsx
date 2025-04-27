import { useStorage } from "@/providers/StorageProvider";
import React from "react";

//Animations
import { motion } from "framer-motion";
//Icons
import { FaHeart } from "react-icons/fa";
//Styles
import styles from "./FavouriteButton.module.scss";
//Interfaces
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";

interface FavouriteButtonProps {
  media: Gif | Sticker;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ media }) => {
  const { localFavouriteGifs, localFavouriteStickers, addItemToLocalStorage } =
    useStorage();

  const isGifOnWishlist = media
    ? localFavouriteGifs.data.find((item) => item.id === media.id)
    : null;
  const isStickerOnWishlist = media
    ? localFavouriteStickers.data.find((item) => item.id === media.id)
    : null;

  return (
    <button className={styles.favouriteButton}>
      <motion.i whileTap={{ scale: 1.6 }} transition={{ duration: 0.2 }}>
        <FaHeart
          className={`${styles.icon} ${
            isGifOnWishlist || isStickerOnWishlist ? styles.filled : ""
          }`}
          onClick={() => media && addItemToLocalStorage(media)}
        />
      </motion.i>
    </button>
  );
};

export default FavouriteButton;
