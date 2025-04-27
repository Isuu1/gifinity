"use client";

import React from "react";

//Styles
import styles from "./UploadSuccess.module.scss";
//Providers
import { useUpload } from "@/providers/UploadProvider";
//Components
import Button from "@/shared/components/UI/Button";
import MediaCard from "@/features/media/components/MediaCard";
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";

interface UploadSuccessProps {
  uploadedMedia: Gif | Sticker;
  closeSummary: () => void;
}

const UploadSuccess: React.FC<UploadSuccessProps> = ({
  uploadedMedia,
  closeSummary,
}) => {
  const { setFile, setFileUrl } = useUpload();

  const handleCloseSummary = () => {
    closeSummary();
    setFile(null);
    setFileUrl(null);
  };

  return (
    <div className={styles.uploadSuccess}>
      <h2>✅ File uploaded successfully!</h2>

      <h3>❤️ Add it to the collection or share with your friends!</h3>

      <MediaCard media={uploadedMedia} />

      <h3>View all your uploads on your profile page.</h3>

      <Button
        className={styles.doneButton}
        variant="light"
        onClick={handleCloseSummary}
      >
        Done
      </Button>
    </div>
  );
};

export default UploadSuccess;
