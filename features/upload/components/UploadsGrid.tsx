"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

//Components
import MediaTypeMenu from "@/features/media/components/MediaTypeMenu";
import MediaOverlay from "@/features/media/components/MediaOverlay";
//Interfaces
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";
//Providers
import { useUpload } from "@/providers/UploadProvider";
import { useCollections } from "@/providers/CollectionsProvider";
//Styles
import styles from "./UploadsGrid.module.scss";
//Animations
import { AnimatePresence } from "framer-motion";

const UploadsGrid = () => {
  const { uploads } = useUpload();
  const { setMedia } = useCollections();

  const [showOverlay, setShowOverlay] = useState<string | null>(null);

  const [displayedItems, setDisplayedItems] = useState<Gif[] | Sticker[]>([]);

  const [activeButton, setActiveButton] = useState<string>("gifs");

  useEffect(() => {
    const uploadedGifs = uploads.gifs || [];
    const uploadedStickers = uploads.stickers || [];
    // Set state based on activeButton
    if (activeButton === "gifs") {
      setDisplayedItems(uploadedGifs);
    } else {
      setDisplayedItems(uploadedStickers);
    }
    // Only depend on the source object and the toggle state
  }, [uploads, activeButton]);

  return (
    <div>
      <MediaTypeMenu
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />

      <div className={styles.feedContainer}>
        {displayedItems &&
          displayedItems.map((media) => (
            <div
              key={media.id}
              className={styles.media}
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
          ))}
      </div>
    </div>
  );
};

export default UploadsGrid;
