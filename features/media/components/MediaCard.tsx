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
import ShareMedia from "./ShareMedia";
//Animations
import { AnimatePresence } from "motion/react";

interface MediaCardProps {
  media: Gif | Sticker;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  const { setMedia, collectionsModalOpen } = useCollections();
  const [showOverlay, setShowOverlay] = useState<string | null>(null);
  const [showShareContainer, setShowShareContainer] = useState(false);

  useEffect(() => {
    //Hide overlay when modal closes
    if (!collectionsModalOpen) {
      setShowOverlay(null);
    }
  }, [collectionsModalOpen]);

  useEffect(() => {
    //Hide overlay when modal closes
    if (!showShareContainer) {
      setShowOverlay(null);
    }
  }, [showShareContainer]);

  return (
    <div
      key={media.id}
      className={styles.mediaCard}
      onMouseEnter={() => {
        setShowOverlay(media.id);
        setMedia(media);
      }}
      onMouseLeave={() => {
        //Prevent overlay from closing when modal is open
        if (!collectionsModalOpen) {
          setShowOverlay(null);
          setMedia(null);
        }
      }}
    >
      <AnimatePresence initial={false}>
        {showShareContainer && (
          <ShareMedia setShowShareContainer={setShowShareContainer} />
        )}
        {showOverlay === media.id && (
          <MediaOverlay
            key={media.id}
            showShareContainer={showShareContainer}
            setShowShareContainer={setShowShareContainer}
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
