import { useStorage } from "@/context/StorageContext";
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";
import React from "react";

//Animations
import { motion } from "framer-motion";

//Icons
import { FaHeart } from "react-icons/fa";

//Styles
import styles from "./FavouriteButton.module.scss";

interface IProps {
  media: Gif | Sticker;
}

const FavouriteButton: React.FC<IProps> = ({ media }) => {
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
  );
};

export default FavouriteButton;
