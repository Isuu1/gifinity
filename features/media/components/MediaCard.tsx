"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

//Styles
import styles from "./MediaCard.module.scss";
//Interfaces
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";
//Providers
import { useCollections } from "@/providers/CollectionsProvider";
//Components
import MediaOverlay from "./MediaOverlay";
//Animations
import { AnimatePresence } from "motion/react";

interface MediaCardProps {
  media: Gif | Sticker;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  //const { setMedia } = useCollections();

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

  return (
    <div
      key={media.id}
      className={styles.mediaCard}
      onMouseEnter={() => {
        setShowOverlay(media.id);
      }}
      onMouseLeave={() => {
        //Prevent modal from closing when user is outside of the viewport
        if (!showCollectionsModal) {
          setShowOverlay(null);
        }
      }}
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
      <Image
        className={styles.image}
        src={media.images.original.url}
        alt={media.title}
        fill
        unoptimized
      />
    </div>
  );
};

export default MediaCard;
