import React from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
//Styles
import styles from "./ConfirmAction.module.scss";
interface ConfirmActionProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  onConfirm,
  onCancel,
  message,
}) => {
  return (
    <Modal theme="dark">
      <h3>{message}</h3>
      <div className={styles.buttons}>
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button onClick={() => onConfirm()} variant="light">
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmAction;
