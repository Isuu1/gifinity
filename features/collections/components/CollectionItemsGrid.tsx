"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

//Components
import Loading from "@/components/Loading/Loading";
import MediaTypeMenu from "@/features/media/components/MediaTypeMenu";
import MediaOverlay from "@/features/media/components/MediaOverlay";
//Styles
import styles from "./CollectionItemsGrid.module.scss";
//Hooks
import { useCollections } from "@/context/CollectionsProvider";
//Types
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";
//Animations
import { AnimatePresence } from "framer-motion";

interface CollectionItemsGridProps {
  collectionId: string;
}

const CollectionItemsGrid: React.FC<CollectionItemsGridProps> = ({
  collectionId,
}) => {
  const { collections, setMedia } = useCollections();

  const [activeButton, setActiveButton] = useState<string>("gifs");

  const [displayedItems, setDisplayedItems] = useState<Gif[] | Sticker[]>([]);

  const [showOverlay, setShowOverlay] = useState<string | null>(null);

  const collection = collections.find(
    (collection) => collection.id === collectionId
  );

  //This useEffect calculates gifs/stickers internally
  useEffect(() => {
    if (!collection) {
      setDisplayedItems([]);
      return;
    }

    const currentGifs = collection.gifs || [];
    const currentStickers = collection.stickers || [];

    // Set state based on activeButton
    if (activeButton === "gifs") {
      setDisplayedItems(currentGifs);
    } else {
      setDisplayedItems(currentStickers);
    }
    // Only depend on the source object and the toggle state
  }, [collection, activeButton]);

  if (!collection) {
    return <Loading />;
  }

  return (
    <>
      <h1>Collection: {collection.name}</h1>
      <MediaTypeMenu
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
      {displayedItems.length === 0 && (
        <div className={styles.emptyCollection}>
          <h3>No {activeButton} found in this collection.</h3>
        </div>
      )}
      <div className={styles.grid}>
        {displayedItems.map((media) => (
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
    </>
  );
};

export default CollectionItemsGrid;
