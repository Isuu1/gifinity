import React from "react";

//Components
import Button from "../UI/Button";

//Styles
import styles from "./ConfirmAction.module.scss";

interface IProps {
  onConfirm: () => void;
  onCancel: (value: boolean) => void;
}

const ConfirmAction: React.FC<IProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.confirmDelete}>
      <h3>Are you sure you want to delete favourites gifs and stickers?</h3>
      <div className="flex-row">
        <Button variant="dark" onClick={() => onConfirm()}>
          Confirm
        </Button>
        <Button onClick={() => onCancel(false)}>Cancel</Button>
      </div>
    </div>
  );
};

export default ConfirmAction;
