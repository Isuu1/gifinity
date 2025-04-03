"use client";

import React, { useActionState, useEffect, useState } from "react";
//Types
import { CollectionNameFormState } from "../types/forms";
//Actions
import { createCollection } from "../lib/actions/createCollection";
//Styles
import styles from "./NewCollectionForm.module.scss";
//Components
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import CollectionError from "./CollectionError";
//Icons
import { BsFillCollectionFill } from "react-icons/bs";
//Hooks
import { useCollections } from "@/providers/CollectionsProvider";

const initialState: CollectionNameFormState = {
  error: null,
  success: false,
  data: { name: "" },
  status: 0,
};

interface FormProps {
  closeForm: () => void;
}

const NewCollectionForm: React.FC<FormProps> = ({ closeForm }) => {
  const [state, formAction, isPending] = useActionState(
    createCollection,
    initialState
  );

  const [error, setError] = useState<string | null>(null);

  const { fetchCollections } = useCollections();

  useEffect(() => {
    if (state.error) {
      setError(state.error);
    }
    if (state.success) {
      fetchCollections();
      closeForm();
    }
  }, [state]);

  return (
    <div className={styles.newCollectionFormContainer}>
      <h3 className={styles.title}>Add new collection</h3>
      <Form action={formAction}>
        <Input
          id="name"
          type="text"
          label="name"
          variant="light"
          labelHidden
          placeholder="Collection name"
          icon={<BsFillCollectionFill />}
          onFocus={() => setError(null)}
        />
        <div className={styles.newCollectionFormButtons}>
          <Button type="submit" onClick={closeForm}>
            Cancel
          </Button>
          <Button variant="light" type="submit" disabled={isPending}>
            Create
          </Button>
        </div>
        {error && <CollectionError error={error} />}
      </Form>
    </div>
  );
};

export default NewCollectionForm;
