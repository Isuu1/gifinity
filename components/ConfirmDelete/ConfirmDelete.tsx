import React from "react";
import Button from "../UI/Button";

interface IProps {
  onConfirm: () => void;
  onCancel: (value: boolean) => void;
}

const ConfirmDelete: React.FC<IProps> = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <h3>Are you sure you want to delete favourites gifs and stickers?</h3>
      <div className="flex-row">
        <Button active onClick={() => onConfirm()}>
          Confirm
        </Button>
        <Button onClick={() => onCancel(false)}>Cancel</Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
