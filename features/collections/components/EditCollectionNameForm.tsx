"use client";

import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

//Types
import { CollectionNameFormState } from "../types/forms";
//Actions
import { editCollectionName } from "../lib/actions/editCollectionName";
//Styles
import styles from "./EditCollectionNameForm.module.scss";
import { toastStyle } from "@/shared/styles/toast";
//Components
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import CollectionError from "./CollectionError";
import Modal from "@/components/UI/Modal";
//Icons
import { BsFillCollectionFill } from "react-icons/bs";
//Hooks
import { useCollections } from "@/providers/CollectionsProvider";
//Types
import { Collection } from "@/features/collections/types/collection";
import { usePathname, useRouter } from "next/navigation";

const initialState: CollectionNameFormState = {
  error: null,
  success: false,
  data: { name: "" },
  status: 0,
};

interface FormProps {
  closeForm: () => void;
  collection: Collection;
}

const EditCollectionNameForm: React.FC<FormProps> = ({
  closeForm,
  collection,
}) => {
  const [state, formAction, isPending] = useActionState(
    //Use bind to pass collection to the action while using useActionState
    //null: The first argument to bind sets the this value inside the function. For server actions, this is usually irrelevant, so null is standard practice.
    editCollectionName.bind(null, collection),
    initialState
  );

  const [error, setError] = useState<string | null>(null);

  const { fetchCollections } = useCollections();

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (state.error) {
      setError(state.error);
    }
    if (state.success) {
      toast.success("Collection name updated successfully", toastStyle);
      fetchCollections();
      closeForm();
      //Push new URL to the router when user is on the collection page
      if (pathname !== "/user/collections") {
        router.push(`/user/collections/${state.data.name}`);
      }
    }
  }, [state]);

  return (
    <Modal theme="dark">
      <div className={styles.editCollectionNameForm}>
        <h3 className={styles.title}>Edit collection name</h3>
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
          <div className={styles.buttons}>
            <Button type="submit" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="light" type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
          {error && <CollectionError error={error} />}
        </Form>
      </div>
    </Modal>
  );
};

export default EditCollectionNameForm;
