import React, { useActionState, useEffect, useState } from "react";

//Components
import Button from "../UI/Button";

//Styles
import styles from "./ConfirmDeleteFavourites.module.scss";
import { useStorage } from "@/context/StorageContext";
import { useAuth } from "@/context/AuthContext";
import Form from "../UI/Form";
import { clearUserFavourites } from "@/actions/clearUserFavourites";

interface IProps {
  onCancel: (value: boolean) => void;
}

const initialState = {
  error: null,
  success: false,
};

const ConfirmAction: React.FC<IProps> = ({ onCancel }) => {
  const { removeFavouritesFromLocalStorage } = useStorage();
  const { user, fetchUser } = useAuth();

  const [state, formAction, isPending] = useActionState(
    clearUserFavourites,
    initialState
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.error) {
      setError(state.error);
    }
  }, [state.error]);

  useEffect(() => {
    if (state.success) {
      fetchUser();
      onCancel(false);
    }
  }, [state.success]);

  return (
    <div className={styles.confirmDelete}>
      <h3>Are you sure you want to delete favourites gifs and stickers?</h3>
      <div className="flex-row">
        {user ? (
          <Form action={formAction}>
            <Button type="submit" disabled={isPending}>
              Confirm
            </Button>
          </Form>
        ) : (
          <Button
            variant="dark"
            onClick={() => removeFavouritesFromLocalStorage()}
          >
            Confirm
          </Button>
        )}

        <Button onClick={() => onCancel(false)}>Cancel</Button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ConfirmAction;
