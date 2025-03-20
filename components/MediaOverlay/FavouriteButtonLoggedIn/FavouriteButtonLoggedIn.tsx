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
import { useAuth } from "@/context/AuthContext";

//Styles
//import styles from "./FavouriteButtonLoggedOut.module.scss";

interface IProps {
  media: Gif | Sticker;
}

const FavouriteButtonLoggedIn: React.FC<IProps> = ({ media }) => {
  const { fetchUser } = useAuth();

  const handleAddToDb = async () => {
    const result = await saveFavouriteMediaToDb(media);
    if (result?.success) fetchUser();
  };

  return (
    <motion.div
      whileTap={{ scale: 1.6 }} // Apply scale animation on tap
      transition={{ duration: 0.2 }}
    >
      <FaHeart
        // className={`${styles.icon} ${
        //   isGifOnWishlist || isStickerOnWishlist ? styles.filled : ""
        // }`}
        onClick={handleAddToDb}
      />
    </motion.div>
  );
};

export default FavouriteButtonLoggedIn;
