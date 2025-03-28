"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

//Utils
import { saveFavouriteMediaToDb } from "@/actions/saveFavouriteMediaToDb";

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
import { toastStyle } from "@/styles/toast";

//Components
import AddToCollectionModal from "../AddToCollectionModal";

interface IProps {
  media: Gif | Sticker;
}

const FavouriteButtonLoggedIn: React.FC<IProps> = ({ media }) => {
  const { fetchUser, favouriteGifs, favouriteStickers } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);

  const [message, setMessage] = useState("");

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

    if (result?.error) {
      toast.error(result.error, toastStyle);
      return;
    }

    if (result?.success && media.type === "gif" && isGifOnWishlist) {
      toast.success("Gif removed from favourites", toastStyle);
    }
    if (result?.success && media.type === "gif" && !isGifOnWishlist) {
      setModalOpen(true);
      setMessage("✅ Gif added to favourites");
    }
    if (result?.success && media.type === "sticker" && isStickerOnWishlist) {
      toast.success("Sticker removed from favourites", toastStyle);
    }
    if (result?.success && media.type === "sticker" && !isStickerOnWishlist) {
      setModalOpen(true);
      setMessage("✅ Sticker added to favourites");
    }
  };

  return (
    <>
      {modalOpen && (
        <AddToCollectionModal message={message} setModalOpen={setModalOpen} />
      )}
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
    </>
  );
};

export default FavouriteButtonLoggedIn;
