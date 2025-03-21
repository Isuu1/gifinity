"use client";

import React from "react";

//Utils
import { saveFavouriteMediaToDb } from "@/utils/user/saveFavouriteMediaToDb";

//Interfaces
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";

//Icons
import { FaHeart } from "react-icons/fa";

//Animations
import { motion } from "framer-motion";

//Context
import { useAuth } from "@/context/AuthContext";

//Styles
import styles from "./FavouriteButtonLoggedIn.module.scss";
import toast from "react-hot-toast";
import { toastStyle } from "@/styles/toast";

interface IProps {
  media: Gif | Sticker;
}

const FavouriteButtonLoggedIn: React.FC<IProps> = ({ media }) => {
  const { fetchUser, favouriteGifs, favouriteStickers } = useAuth();

  const isGifOnWishlist = favouriteGifs.data.some(
    (gif: Gif) => gif.id === media.id
  );
  const isStickerOnWishlist = favouriteStickers.data.some(
    (sticker: Sticker) => sticker.id === media.id
  );

  const handleAddToDb = async () => {
    const result = await saveFavouriteMediaToDb(media);
    //Refetch the user data to update the favourite gifs and stickers on client
    if (result?.success) fetchUser();
    // if (result?.success && !isGifOnWishlist && media.type === "gif") {
    //   toast.success("Gif added to wishlist", toastStyle);
    // } else if (result?.success && isGifOnWishlist) {
    //   toast.success("Gif removed from wishlist", toastStyle);
    // }
    // if (result?.success && !isStickerOnWishlist && media.type === "sticker") {
    //   toast.success("Sticker added to wishlist", toastStyle);
    // } else if (result?.success && isStickerOnWishlist) {
    //   toast.success("Sticker removed from wishlist", toastStyle);
    // }
    if (result?.success && media.type === "gif") {
      toast.success(
        isGifOnWishlist ? "Gif removed from wishlist" : "Gif added to wishlist",
        toastStyle
      );
    }
    if (result?.success && media.type === "sticker") {
      toast.success(
        isStickerOnWishlist
          ? "Sticker removed from wishlist"
          : "Sticker added to wishlist",
        toastStyle
      );
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 1.6 }} // Apply scale animation on tap
      transition={{ duration: 0.2 }}
    >
      <FaHeart
        className={`${styles.icon} ${
          isGifOnWishlist || isStickerOnWishlist ? styles.filled : ""
        }`}
        onClick={handleAddToDb}
      />
    </motion.div>
  );
};

export default FavouriteButtonLoggedIn;
