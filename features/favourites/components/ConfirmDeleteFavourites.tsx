import React from "react";

//Components
import Button from "../../../shared/components/UI/Button";
import Modal from "@/shared/components/UI/Modal";

//Styles
import styles from "./ConfirmDeleteFavourites.module.scss";

//Context
import { useStorage } from "@/providers/StorageProvider";

interface IProps {
  onClose: (value: boolean) => void;
}

const ConfirmDeleteFavourites: React.FC<IProps> = ({ onClose }) => {
  const { removeFavouritesFromLocalStorage } = useStorage();

  return (
    <Modal key="modal" theme="light">
      <div className={styles.confirmDelete}>
        <h3>Are you sure you want to delete favourites gifs and stickers?</h3>
        <div className="flex-row">
          <Button
            variant="dark"
            onClick={() => {
              removeFavouritesFromLocalStorage();
              onClose(false);
            }}
          >
            Confirm
          </Button>
          <Button onClick={() => onClose(false)}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteFavourites;
