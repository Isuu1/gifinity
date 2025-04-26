"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

//Components
import Loading from "@/shared/components/Loading/Loading";
import MediaTypeMenu from "@/features/media/components/MediaTypeMenu";
import PageHeadline from "@/shared/components/PageHeadline/PageHeadline";
import CollectionMenu from "./CollectionMenu";
import MediaCard from "@/features/media/components/MediaCard";
//Styles
import styles from "./CollectionItemsGrid.module.scss";
//Hooks
import { useCollections } from "@/providers/CollectionsProvider";
//Types
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";
//Icons
import { IoArrowUndo } from "react-icons/io5";

interface CollectionItemsGridProps {
  collectionName: string;
}

const CollectionItemsGrid: React.FC<CollectionItemsGridProps> = ({
  collectionName,
}) => {
  const { collections } = useCollections();

  const [activeButton, setActiveButton] = useState<string>("gifs");

  const [displayedItems, setDisplayedItems] = useState<Gif[] | Sticker[]>([]);

  const collection = collections.find(
    (collection) => collection.name === collectionName
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

  if (!collection)
    return (
      <>
        <Link href="/user/collections" className={styles.backButton}>
          <IoArrowUndo className={styles.icon} />
          <h2>Back to collections</h2>
        </Link>
        <PageHeadline
          title={`Collection: `}
          imageUrl="/images/collection.svg"
        />
        <Loading />
      </>
    );

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
          <MediaCard media={media} key={media.id} />
        ))}
      </div>
    </>
  );
};

export default CollectionItemsGrid;
