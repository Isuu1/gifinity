"use client";

import React, { useEffect, useState } from "react";

//Styles
import styles from "./MediaCard.module.scss";
//Interfaces
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";
//Components
import MediaOverlay from "./MediaOverlay";
//Animations
import { AnimatePresence } from "motion/react";

interface MediaCardProps {
  media: Gif | Sticker;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  const [showOverlay, setShowOverlay] = useState<string | null>(null);

  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const [showCollectionsModal, setShowCollectionsModal] =
    useState<boolean>(false);

  useEffect(() => {
    //Hide overlay when modal closes
    if (!showCollectionsModal) {
      setShowOverlay(null);
    }
  }, [showCollectionsModal]);

  useEffect(() => {
    //Hide overlay when modal closes
    if (!showShareModal) {
      setShowOverlay(null);
    }
  }, [showShareModal]);

  const handleMouseLeave = () => {
    //Prevent modal from closing when user is outside of the viewport
    if (showCollectionsModal || showShareModal) {
      return;
    }
    setShowOverlay(null);
  };

  return (
    <div
      key={media.id}
      className={styles.mediaCard}
      onMouseEnter={() => {
        setShowOverlay(media.id);
      }}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {showOverlay === media.id && (
          <MediaOverlay
            key={media.id}
            media={media}
            showCollectionsModal={showCollectionsModal}
            setShowCollectionsModal={setShowCollectionsModal}
            showShareModal={showShareModal}
            setShowShareModal={setShowShareModal}
          />
        )}
      </AnimatePresence>
      <video
        className={styles.image}
        src={media.images.original.mp4}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default MediaCard;
