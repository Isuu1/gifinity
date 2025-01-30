"use client";

import React from "react";
import styles from "./GifOverlay.module.scss";

//Icons
import { FaCopy } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

//Utils
import { copyToClipboard } from "@/utils/utils";
import { useStorage } from "@/context/StorageContext";

//Animations
import { motion } from "framer-motion";
import { overlayAnimation } from "@/styles/animations";

interface IProps {
  gifUrl: string;
}

const GifOverlay: React.FC<IProps> = ({ gifUrl }) => {
  const { userGifs, addItem } = useStorage();

  const isGifOnWishlist = userGifs.find((gif) => gif === gifUrl);

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
          onClick={() => copyToClipboard(gifUrl)}
        />
        <FaHeart
          className={`${styles.icon} ${isGifOnWishlist ? styles.filled : ""}`}
          onClick={() => addItem(gifUrl)}
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

export default GifOverlay;
