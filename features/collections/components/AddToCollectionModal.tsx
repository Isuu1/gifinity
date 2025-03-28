import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import React, { useActionState, useState } from "react";

//Styles
import styles from "./AddToCollectionModal.module.scss";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/UI/Input";
import { createCollection } from "@/features/collections/actions/createCollection";
import Form from "@/components/UI/Form";
import { CreateCollectionFormState } from "@/types/forms";

interface IProps {
  message: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: CreateCollectionFormState = {
  error: null,
  success: false,
  data: { name: "" },
  status: 0,
};

const AddToCollectionModal: React.FC<IProps> = ({ message, setModalOpen }) => {
  const { collections } = useAuth();

  const [newCollection, setNewCollection] = useState<boolean>(false);

  const [state, formAction, isPending] = useActionState(
    createCollection,
    initialState
  );

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
        <h3>{message}</h3>
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
            onClick={() => setNewCollection(true)}
          >
            New collection
          </Button>
          {newCollection && (
            <div className={styles.newCollectionContainer}>
              <Form action={formAction}>
                <Input id="name" type="text" label="name" variant="light" />
                <Button variant="light" type="submit">
                  Create
                </Button>
              </Form>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddToCollectionModal;
