import React, { useRef } from "react";
import toast from "react-hot-toast";

//Styles
import styles from "./ChangeUserAvatar.module.scss";
import { toastStyle } from "@/styles/toast";
//Components
import Button from "@/components/UI/Button";
//Providers
import { useAuth } from "@/providers/AuthProvider";
//Actions
import { changeUserAvatar } from "../lib/actions/changeUserAvatar";
//Icons
import { MdEditSquare } from "react-icons/md";

const ChangeUserAvatar: React.FC = () => {
  const { user, fetchUser } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return;

    const file = e.target.files[0];

    //Append file to FormData
    const formData = new FormData();

    formData.append("file", file);
    //Pass formData to server action

    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds 1MB limit.", {
        duration: 5000,
        style: toastStyle.style,
      });
      return;
    }

    try {
      const result = await changeUserAvatar(formData);

      if (result.error) {
        toast.error(result.error, {
          duration: 5000,
          style: toastStyle.style,
        });
        return;
      }
      if (result.success) {
        toast.success("Avatar updated successfully.", {
          duration: 5000,
          style: toastStyle.style,
        });
        fetchUser(); //Fetch user again to get new avatar
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw { error: { error } }; // Rethrow the error to be handled by the caller
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={styles.changeAvatarContainer}>
      <Button
        className={styles.button}
        variant="light"
        onClick={handleButtonClick}
        icon={<MdEditSquare />}
      >
        Change
      </Button>
      <div className={styles.fileInput}>
        <label htmlFor="file" className={styles.label}>
          Select file
        </label>
        <input
          className={styles.input}
          ref={inputRef}
          id="file"
          name="file"
          type="file"
          accept="image/jpeg, image/png, image/gif, image/webp"
          onChange={handleChangeAvatar}
        />
      </div>
    </div>
  );
};

export default ChangeUserAvatar;
