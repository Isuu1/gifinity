"use client";

import React from "react";
import styles from "./GifOverlay.module.scss";

//Icons
import { FaCopy } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { copyToClipboard } from "@/utils/utils";

interface IProps {
  gifUrl: string;
}

const GifOverlay: React.FC<IProps> = ({ gifUrl }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlay_element}>
        <FaCopy
          className={styles.icon}
          onClick={() => copyToClipboard(gifUrl)}
        />
        <FaHeart className={styles.icon} />
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
    </div>
  );
};

export default GifOverlay;
