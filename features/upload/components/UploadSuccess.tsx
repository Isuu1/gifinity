"use client";

import Image from "next/image";
import React, { useState } from "react";

//Styles
import styles from "./UploadSuccess.module.scss";
import { useCollections } from "@/providers/CollectionsProvider";
import MediaOverlay from "@/features/media/components/MediaOverlay";

const UploadSuccess: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const { media } = useCollections();

  return (
    <div className={styles.uploadSuccess}>
      <h2>✅ File uploaded successfully!</h2>
      <h3>Would you like to add it to collection?</h3>
      <div
        className={styles.imageContainer}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        {showOverlay && <MediaOverlay key={media?.id} />}
        <Image
          className={styles.image}
          src={media?.images.original.url || ""}
          fill
          alt=""
        />
      </div>
    </div>
  );
};

export default UploadSuccess;
