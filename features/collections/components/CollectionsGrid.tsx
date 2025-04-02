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
//Utils
import { generateCollectionThumbnail } from "../lib/utils/generateCollectionThumbnail";
//Types
import { Collection } from "../types/collection";
import Link from "next/link";

const CollectionsGrid: React.FC = () => {
  const { collections } = useCollections();

  return (
    <div>
      <AnimatePresence>
        <div className={styles.collectionsGrid}>
          {collections.map((collection: Collection) => (
            <div className={styles.collectionTile} key={collection.id}>
              <CollectionMenu
                collection={collection}
                variant="collectionsGrid"
              />
              <Link
                key={collection.id}
                href={`/user/collections/${collection.name}`}
              >
                <Image
                  className={styles.image}
                  src={generateCollectionThumbnail(collection)}
                  alt="collection-thumbnail"
                  fill
                />
                <div className={styles.data}>
                  <h3 className={styles.name}>{collection.name}</h3>
                  <div className={styles.stats}>
                    <h5>{collection.gifs.length} gifs</h5>
                    <h5>{collection.stickers.length} stickers</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default CollectionsGrid;
