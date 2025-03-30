"use client";

import React, { useState } from "react";

//Styles
import styles from "./CollectionsModal.module.scss";

//Context
import { useAuth } from "@/context/AuthContext";

//Components
import AddNewCollectionForm from "./AddNewCollectionForm";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";

//Interfaces
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";

interface IProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  media: Gif | Sticker;
}

const CollectionsModal: React.FC<IProps> = ({ setModalOpen, media }) => {
  const { collections } = useAuth();

  const [newCollectionForm, setNewCollectionForm] = useState<boolean>(false);

  console.log(collections);

  return (
    <Modal theme="dark">
      <div className={styles.addToCollectionContainer}>
        <Button
          className={styles.closeButton}
          onClick={() => setModalOpen(false)}
        >
          x
        </Button>
        <h2 className={styles.title}>Add to collection</h2>
        <div className={styles.collectionsContainer}>
          <h2>Collections</h2>

          {collections.length > 0 ? (
            collections.map((collection, index) => (
              <div key={index} className={styles.collection}>
                <h3>{collection.name}</h3>
                <Button variant="light">+</Button>
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
