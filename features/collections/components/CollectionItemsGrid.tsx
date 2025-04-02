"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

//Components
import Loading from "@/components/Loading/Loading";
import MediaTypeMenu from "@/features/media/components/MediaTypeMenu";
import MediaOverlay from "@/features/media/components/MediaOverlay";
import PageHeadline from "@/components/PageHeadline/PageHeadline";
import CollectionMenu from "./CollectionMenu";
//Styles
import styles from "./CollectionItemsGrid.module.scss";
//Hooks
import { useCollections } from "@/context/CollectionsProvider";
//Types
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";
//Animations
import { AnimatePresence } from "framer-motion";
//Icons
import { IoArrowUndo } from "react-icons/io5";
import Link from "next/link";

interface CollectionItemsGridProps {
  collectionName: string;
}

const CollectionItemsGrid: React.FC<CollectionItemsGridProps> = ({
  collectionName,
}) => {
  const { collections, setMedia } = useCollections();

  const [activeButton, setActiveButton] = useState<string>("gifs");

  const [displayedItems, setDisplayedItems] = useState<Gif[] | Sticker[]>([]);

  const [showOverlay, setShowOverlay] = useState<string | null>(null);

  const collection = collections.find(
    (collection) => collection.name === collectionName
  );
  console.log(collectionName);
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
      <Link href="/user/collections" className={styles.backButton}>
        <IoArrowUndo className={styles.icon} />
        <h2>Back to collections</h2>
      </Link>
      <div className="flex-row">
        <PageHeadline
          title={`Collection: ${collection.name}`}
          imageUrl="/images/collection.svg"
        />
        <CollectionMenu collection={collection} variant="collectionItemsGrid" />
      </div>

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
