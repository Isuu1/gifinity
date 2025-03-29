import React, { useActionState } from "react";
import { CreateCollectionFormState } from "../types/forms";
import { createCollection } from "../actions/createCollection";

//Styles
import styles from "./AddNewCollectionForm.module.scss";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

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

  return (
    <div className={styles.newCollectionContainer}>
      <Form action={formAction}>
        <Input id="name" type="text" label="name" variant="light" />
        <Button variant="light" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default AddNewCollectionForm;
