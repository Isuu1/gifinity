"use client";

import React, { useEffect, useState } from "react";

//Components
import MediaTypeMenu from "@/features/media/components/MediaTypeMenu";
import Loading from "@/components/Loading/Loading";
import MediaCard from "@/features/media/components/MediaCard";
//Interfaces
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";
//Providers
import { useUpload } from "@/providers/UploadProvider";
//Styles
import styles from "./UploadsGrid.module.scss";

const UploadsGrid = () => {
  const { uploads, isLoading } = useUpload();

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <MediaTypeMenu
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />

      <div className={styles.feedContainer}>
        {displayedItems.length === 0 && (
          <div className={styles.emptyCollection}>
            <h3>No {activeButton} found in this collection.</h3>
          </div>
        )}
        {displayedItems &&
          displayedItems.map((media) => (
            <MediaCard media={media} key={media.id} />
          ))}
      </div>
    </div>
  );
};

export default UploadsGrid;
