"use client";

import React, { useActionState, useEffect, useState } from "react";
import { CreateCollectionFormState } from "../types/forms";
import { createCollection } from "../actions/createCollection";

//Styles
import styles from "./AddNewCollectionForm.module.scss";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

//Icons
import { BsFillCollectionFill } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";
import CollectionError from "./CollectionError";

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
