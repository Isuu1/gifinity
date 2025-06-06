"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

//Styles
import styles from "./CollectionsModal.module.scss";
import { toastStyle } from "@/shared/styles/toast";
//Icons
import { BsFillCollectionFill } from "react-icons/bs";
//Animations
import { motion } from "motion/react";
//Providers
import { useCollections } from "@/providers/CollectionsProvider";
//Components
import NewCollectionForm from "./NewCollectionForm";
import Modal from "@/shared/components/UI/Modal";
import Button from "@/shared/components/UI/Button";
import CollectionError from "./CollectionError";
//Actions
import { saveToCollection } from "../lib/actions/saveToCollection";
//Types
import { Collection } from "../types/collection";
//Utils
import { generateCollectionButton } from "../lib/utils/generateCollectionButton";
//Interfaces
import { Sticker } from "@/shared/interfaces/stickers";
import { Gif } from "@/shared/interfaces/gifs";

interface CollectionsModalProps {
  media: Gif | Sticker;
  closeModal: () => void;
}

const CollectionsModal: React.FC<CollectionsModalProps> = ({
  media,
  closeModal,
}) => {
  const { collections, fetchCollections } = useCollections();

  const [newCollectionForm, setNewCollectionForm] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();

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

    try {
      const result = await saveToCollection(media, collection.name);

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (media.type === "gif") {
        if (result?.success) {
          if (isGifInCollection) {
            toast.success("Gif removed from collection", toastStyle);
            if (pathname.startsWith("/user/collections")) {
              closeModal();
            }
          } else {
            toast.success("Gif added to collection", toastStyle);
          }
        }
      } else if (media.type === "sticker") {
        if (result?.success) {
          if (isStickerInCollection) {
            toast.success("Sticker removed from collection", toastStyle);
            if (pathname.startsWith("/user/collections")) {
              closeModal();
            }
          } else {
            toast.success("Sticker added to collection", toastStyle);
          }
        }
      }

      fetchCollections(); // Fetch collections again to update the state
    } catch (error) {
      console.error("Error saving to collection:", error);
      setError("Failed to save to collection. Please try again.");
    }
  };

  if (!media) {
    return null;
  }

  return (
    <Modal theme="dark" onClose={closeModal}>
      <div className={styles.collectionsWrapper}>
        <div className={styles.collectionsContainer}>
          <h2>Collections</h2>
          {collections.length === 0 && <h4>No collections found</h4>}
          {collections.map((collection, index) => (
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
                {generateCollectionButton(collection, media)}
              </motion.button>

              {error && <CollectionError error={error} />}
            </div>
          ))}

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
        <Button variant="dark" onClick={closeModal}>
          Dismiss
        </Button>
      </div>
    </Modal>
  );
};

export default CollectionsModal;
