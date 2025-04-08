"use client";

import Image from "next/image";
import React, { useState } from "react";

//Styles
import styles from "./UploadSuccess.module.scss";
import { useCollections } from "@/providers/CollectionsProvider";
import MediaOverlay from "@/features/media/components/MediaOverlay";
import { AnimatePresence } from "framer-motion";
import Button from "@/components/UI/Button";
import Link from "next/link";

interface UploadSuccessProps {
  closeSummary: () => void;
}

const UploadSuccess: React.FC<UploadSuccessProps> = ({ closeSummary }) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const { media } = useCollections();

  return (
    <div className={styles.uploadSuccess}>
      <h2>✅ File uploaded successfully!</h2>
      <h3>❤️ Add it to the collection or share with your friends! ❤️</h3>
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
      <h3>
        View and manage all your uploads on your{" "}
        <Link href="/user/profile" className={styles.link}>
          Profile Page
        </Link>
      </h3>
      <Button variant="light" onClick={closeSummary}>
        Done
      </Button>
    </div>
  );
};

export default UploadSuccess;
