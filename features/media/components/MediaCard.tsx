"use client";

import React, { useState } from "react";
import Image from "next/image";

//Styles
import styles from "./MediaCard.module.scss";
//Interfaces
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";
//Providers
import { useCollections } from "@/providers/CollectionsProvider";
//Components
import MediaOverlay from "./MediaOverlay";
//Animations
import { AnimatePresence } from "framer-motion";

interface MediaCardProps {
  media: Gif | Sticker;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  const { setMedia } = useCollections();
  const [showOverlay, setShowOverlay] = useState<string | null>(null);

  return (
    <div
      key={media.id}
      className={styles.mediaCard}
      onMouseEnter={() => {
        setShowOverlay(media.id);
        setMedia(media);
      }}
      onMouseLeave={() => {
        setShowOverlay(null);
      }}
    >
      <AnimatePresence initial={false}>
        {showOverlay === media.id && <MediaOverlay key={media.id} />}
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
