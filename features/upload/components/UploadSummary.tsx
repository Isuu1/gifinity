"use client";

import React, { useState } from "react";
import Image from "next/image";

//Styles
import styles from "./UploadSummary.module.scss";
//Components
import Input from "@/shared/components/UI/Input";
import Button from "@/shared/components/UI/Button";
import UploadSuccess from "./UploadSuccess";
import Error from "@/shared/components/Error/Error";
//Actions
import { uploadFile } from "../lib/actions/uploadFile";
//Utils
import { generateFileSize } from "../lib/utils/generateFileSize";
//Providers
import { useAuth } from "@/providers/AuthProvider";
import { useCollections } from "@/providers/CollectionsProvider";
import { useUpload } from "@/providers/UploadProvider";
//Icons
import { FaTags } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoArrowUndo } from "react-icons/io5";
//Interfaces
import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";

interface UploadSummaryProps {
  closeSummary: () => void;
}

const UploadSummary: React.FC<UploadSummaryProps> = ({ closeSummary }) => {
  const { username } = useAuth();
  const { media, setMedia } = useCollections();
  const { file, setFile, fileUrl, setFileUrl } = useUpload();

  const [success, setSuccess] = useState<boolean>(false);
  const [tags, setTags] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileName = file?.name.split(".")[0];
  const fileExtension = file?.name.split(".").pop();

  const handleCloseSummary = () => {
    closeSummary();
    setFile(null);
    setFileUrl(null);
  };

  const handleUpload = async () => {
    setIsPending(true);
    setError(null);
    // Create a FormData object to send the file
    const formData = new FormData();

    formData.append("file", file || "");
    formData.append("fileUrl", fileUrl || "");
    formData.append("tags", tags || "");

    try {
      // Pass formData to server action
      const result = await uploadFile(formData);

      if (result.success) {
        //Handle the response from the server
        //Receive the media object
        const media: Gif | Sticker | null = result.data;
        setMedia(media);
        setSuccess(true);
      }

      if (result.error) {
        setError(result.error);
        return;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(`Failed to upload file: ${error}`);
    } finally {
      setIsPending(false);
    }
  };

  // Create a URL for the file object
  // This URL can be used as the src for an <Image /> element
  const imageUrl = file ? URL.createObjectURL(file) : null;

  if (success && media) {
    return <UploadSuccess closeSummary={closeSummary} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.backButtonContainer} onClick={handleCloseSummary}>
        <IoArrowUndo />
        <span>Back</span>
      </h2>
      <div className={styles.innerWrapper}>
        <div className={styles.fileContainer}>
          {imageUrl && (
            <Image className={styles.image} src={imageUrl} fill alt="" />
          )}
          {fileUrl && (
            <Image className={styles.image} src={fileUrl} fill alt="" />
          )}
          {file && (
            <div className={styles.fileName}>
              <span className={styles.name}>{fileName}</span>
              <span className={styles.extension}>{fileExtension}</span>
              <span className={styles.size}>{generateFileSize(file)}</span>
            </div>
          )}
        </div>
        <div className={styles.imageInfo}>
          <h2>Add image info</h2>
          <Input
            id="tags"
            type="text"
            label="Tags"
            placeholder="Separate tags by comma"
            icon={<FaTags />}
            onChange={(e) => setTags(e.target.value)}
          />
          <Input
            id="username"
            label="Username"
            type="text"
            value={username}
            disabled
            icon={<FaUser />}
          />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button onClick={closeSummary}>Cancel</Button>
        <Button variant="light" onClick={handleUpload} disabled={isPending}>
          {isPending ? "Uploading media..." : "Upload"}
        </Button>
      </div>
      {error && <Error errorMessage={error} />}
    </div>
  );
};

export default UploadSummary;
