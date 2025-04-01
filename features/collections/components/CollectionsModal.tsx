"use client";

import React, { useState } from "react";

//Styles
import styles from "./CollectionsModal.module.scss";

//Context
import { useCollections } from "@/context/CollectionsProvider";

//Components
import AddNewCollectionForm from "./AddNewCollectionForm";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import { saveToCollection } from "../actions/saveToCollection";
import { Collection } from "@/interfaces/collections";

const CollectionsModal: React.FC = () => {
  const { collections, setCollectionsModalOpen, media, fetchCollections } =
    useCollections();

  const [newCollectionForm, setNewCollectionForm] = useState<boolean>(false);

  const generateCollectionButton = (collection: Collection) => {
    if (media && media.type === "gif") {
      const isAdded = collection.gifs.some((gif) => gif.id === media.id);

      return isAdded ? "Added" : "+";
    }
  };

  console.log(collections);
  console.log("media", media);

  const handleAddToCollection = async (collectionName: string) => {
    console.log("Add to collection clicked for:", collectionName);
    if (!media) {
      console.error("No media to add to collection");
      return;
    }
    const result = await saveToCollection(media, collectionName);
    console.log("Result of saveToCollection:", result);
    fetchCollections(); // Fetch collections again to update the state
  };

  return (
    <Modal theme="dark">
      <div className={styles.addToCollectionContainer}>
        <Button
          className={styles.closeButton}
          onClick={() => setCollectionsModalOpen(false)}
        >
          x
        </Button>
        <h2 className={styles.title}>Add to collection</h2>
        <div className={styles.collectionsContainer}>
          <h2>Collections</h2>

          {collections?.length > 0 ? (
            collections.map((collection, index) => (
              <div key={index} className={styles.collection}>
                <h3>{collection.name}</h3>

                {generateCollectionButton(collection)}

                <Button
                  variant="light"
                  onClick={() => handleAddToCollection(collection.name)}
                >
                  +
                </Button>
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
          {newCollectionForm && <AddNewCollectionForm />}
        </div>
      </div>
    </Modal>
  );
};

export default CollectionsModal;
