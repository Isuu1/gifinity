import { useStorage } from "@/providers/StorageProvider";
import React from "react";

//Animations
import { motion } from "framer-motion";

//Icons
import { FaHeart } from "react-icons/fa";

//Styles
import styles from "./FavouriteButton.module.scss";
import { useCollections } from "@/providers/CollectionsProvider";

const FavouriteButton: React.FC = () => {
  const { localFavouriteGifs, localFavouriteStickers, addItemToLocalStorage } =
    useStorage();
  const { media } = useCollections();

  const isGifOnWishlist = media
    ? localFavouriteGifs.data.find((item) => item.id === media.id)
    : null;
  const isStickerOnWishlist = media
    ? localFavouriteStickers.data.find((item) => item.id === media.id)
    : null;

  return (
    <motion.div
      whileTap={{ scale: 1.6 }} // Apply scale animation on tap
      transition={{ duration: 0.2 }}
    >
      <FaHeart
        className={`${styles.icon} ${
          isGifOnWishlist || isStickerOnWishlist ? styles.filled : ""
        }`}
        onClick={() => media && addItemToLocalStorage(media)}
      />
    </motion.div>
  );
};

export default FavouriteButton;
