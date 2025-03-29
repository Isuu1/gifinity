"use client";

import React, { useActionState, useEffect, useState } from "react";

//Types
import { CreateCollectionFormState } from "../types/forms";

//Actions
import { createCollection } from "../actions/createCollection";

//Styles
import styles from "./AddNewCollectionForm.module.scss";

//Components
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import CollectionError from "./CollectionError";

//Icons
import { BsFillCollectionFill } from "react-icons/bs";

//Hooks
import { useAuth } from "@/context/AuthContext";

const initialState: CreateCollectionFormState = {
  error: null,
  success: false,
  data: { name: "" },
  status: 0,
};

const AddNewCollectionForm = () => {
  const [state, formAction, isPending] = useActionState(
    createCollection,
    initialState
  );

  const [error, setError] = useState<string | null>(null);

  const { fetchUser } = useAuth();

  useEffect(() => {
    if (state.error) {
      setError(state.error);
    }
    if (state.success) {
      fetchUser();
    }
  }, [state]);

  return (
    <div className={styles.newCollectionContainer}>
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
        <Button variant="light" type="submit" disabled={isPending}>
          Create
        </Button>
        {error && <CollectionError error={error} />}
      </Form>
    </div>
  );
};

export default AddNewCollectionForm;
