"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
//Styles
import styles from "./CollectionsModal.module.scss";
import { toastStyle } from "@/styles/toast";
//Icons
import { IoIosAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { BsFillCollectionFill } from "react-icons/bs";
//Animations
import { motion } from "motion/react";
//Context
import { useCollections } from "@/context/CollectionsProvider";
//Components
import NewCollectionForm from "./NewCollectionForm";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import CollectionError from "./CollectionError";
//Actions
import { saveToCollection } from "../actions/saveToCollection";
//Types
import { Collection } from "@/interfaces/collections";

const CollectionsModal: React.FC = () => {
  const { collections, setCollectionsModalOpen, media, fetchCollections } =
    useCollections();

  const [newCollectionForm, setNewCollectionForm] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const generateCollectionButton = (collection: Collection) => {
    if (media && media.type === "gif") {
      const isGifInCollection = collection.gifs.some(
        (gif) => gif.id === media.id
      );

      return isGifInCollection ? <IoIosRemoveCircle /> : <IoIosAddCircle />;
    }
    if (media && media.type === "sticker") {
      const isStickerInCollection = collection.stickers.some(
        (sticker) => sticker.id === media.id
      );

      return isStickerInCollection ? <IoIosRemoveCircle /> : <IoIosAddCircle />;
    }
  };

  const handleCollection = async (collection: Collection) => {
    setError(null); // Reset error state

    if (!media) {
      console.error("No media to add to collection");
      return;
    }

    const isGifInCollection = collection.gifs.some(
      (gif) => gif.id === media.id
    );

    const isStickerInCollection = collection.stickers.some(
      (sticker) => sticker.id === media.id
    );

    const result = await saveToCollection(media, collection.name);

    if (result?.error) {
      setError(result.error);
      return;
    }

    if (result?.success && result?.gif && isGifInCollection) {
      toast.success("Gif removed from collection", toastStyle);
    }

    if (result?.success && result?.gif && !isGifInCollection) {
      toast.success("Gif added to collection", toastStyle);
    }

    if (result?.success && result?.sticker && isStickerInCollection) {
      toast.success("Sticker removed from collection", toastStyle);
    }

    if (result?.success && result?.sticker && !isStickerInCollection) {
      toast.success("Sticker added to collection", toastStyle);
    }

    fetchCollections(); // Fetch collections again to update the state
  };

  return (
    <Modal theme="dark">
      <div className={styles.collectionsWrapper}>
        <IoIosCloseCircle
          className={styles.closeButton}
          onClick={() => setCollectionsModalOpen(false)}
        />

        <div className={styles.collectionsContainer}>
          <h2>Collections</h2>

          {collections?.length > 0 ? (
            collections.map((collection, index) => (
              <div key={index} className={styles.collection}>
                <h3 className={styles.name}>
                  <BsFillCollectionFill />
                  {collection.name}
                </h3>
                <motion.button
                  whileTap={{ scale: 1.4 }}
                  className={styles.collectionButton}
                  onClick={() => handleCollection(collection)}
                >
                  {generateCollectionButton(collection)}
                </motion.button>

                {error && <CollectionError error={error} />}
              </div>
            ))
          ) : (
            <h4>No collections found</h4>
          )}

          <Button
            className={styles.addNewCollectionButton}
            variant="light"
            onClick={() => setNewCollectionForm(true)}
          >
            New collection
          </Button>

          {newCollectionForm && (
            <NewCollectionForm closeForm={() => setNewCollectionForm(false)} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CollectionsModal;
