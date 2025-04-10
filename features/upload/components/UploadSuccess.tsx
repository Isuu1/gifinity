"use client";

import React from "react";

//Styles
import styles from "./UploadSuccess.module.scss";
//Providers
import { useCollections } from "@/providers/CollectionsProvider";
import { useUpload } from "@/providers/UploadProvider";
//Components
import Button from "@/components/UI/Button";
import MediaCard from "@/features/media/components/MediaCard";

interface UploadSuccessProps {
  closeSummary: () => void;
}

const UploadSuccess: React.FC<UploadSuccessProps> = ({ closeSummary }) => {
  const { setFile, setFileUrl } = useUpload();

  const { media } = useCollections();

  const handleCloseSummary = () => {
    closeSummary();
    setFile(null);
    setFileUrl(null);
  };

  return (
    <div className={styles.uploadSuccess}>
      <h2>✅ File uploaded successfully!</h2>

      <h3>❤️ Add it to the collection or share with your friends!</h3>

      {media && <MediaCard media={media} />}

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
