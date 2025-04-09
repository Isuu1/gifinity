"use client";

import Image from "next/image";
import React, { useState } from "react";

//Styles
import styles from "./UploadSuccess.module.scss";
import { useCollections } from "@/providers/CollectionsProvider";
import MediaOverlay from "@/features/media/components/MediaOverlay";
import { AnimatePresence } from "framer-motion";
import Button from "@/components/UI/Button";
import { useUpload } from "@/providers/UploadProvider";

interface UploadSuccessProps {
  closeSummary: () => void;
}

const UploadSuccess: React.FC<UploadSuccessProps> = ({ closeSummary }) => {
  const { setFile, setFileUrl } = useUpload();

  const { media } = useCollections();

  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleCloseSummary = () => {
    closeSummary();
    setFile(null);
    setFileUrl(null);
  };

  return (
    <div className={styles.uploadSuccess}>
      <h2>✅ File uploaded successfully!</h2>
      <h3>❤️ Add it to the collection or share with your friends!</h3>
      <div
        className={styles.imageContainer}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        <AnimatePresence>
          {showOverlay && <MediaOverlay key={media?.id} />}
        </AnimatePresence>
        <Image
          className={styles.image}
          src={media?.images.original.url || ""}
          fill
          alt=""
        />
      </div>
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
