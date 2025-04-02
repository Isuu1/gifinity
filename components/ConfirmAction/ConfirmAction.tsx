import React from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
//Styles
import styles from "./ConfirmAction.module.scss";
import CollectionError from "@/features/collections/components/CollectionError";
interface ConfirmActionProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  errorMessage?: string | null;
}

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  onConfirm,
  onCancel,
  message,
  errorMessage,
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
      {errorMessage && <CollectionError error={errorMessage} />}
    </Modal>
  );
};

export default ConfirmAction;
