"use client";

import React from "react";
import Image from "next/image";

//Components
import CollectionMenu from "./CollectionMenu";
//Styles
import styles from "./CollectionsGrid.module.scss";
//Animations
import { AnimatePresence } from "framer-motion";
//Hooks
import { useCollections } from "@/context/CollectionsProvider";
//Types
import { Collection } from "@/interfaces/collections";

const CollectionsGrid: React.FC = () => {
  const { collections } = useCollections();

  console.log("collections", collections);

  const generateCollectionThumbnail = (collection: Collection) => {
    if (collection.gifs.length > 0) {
      const gifslength = collection.gifs.length;
      return collection.gifs[gifslength - 1].images.original.url;
    }
    if (collection.stickers.length > 0) {
      const stickersLength = collection.stickers.length;
      return collection.stickers[stickersLength - 1].images.original.url;
    }
    return "/images/avatar.gif"; // Fallback thumbnail
  };

  return (
    <div>
      <AnimatePresence>
        <div className={styles.collectionsGrid}>
          {collections.map((collection) => (
            <div className={styles.collectionTile} key={collection.id}>
              <CollectionMenu />

              <Image
                className={styles.image}
                src={generateCollectionThumbnail(collection)}
                alt="collection-thumbnail"
                fill
              />
              <h3>{collection.name}</h3>
              <div className={styles.data}>
                <h5>{collection.gifs.length} gifs</h5>
                <h5>{collection.stickers.length} stickers</h5>
              </div>
            </div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default CollectionsGrid;
