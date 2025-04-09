"use client";

import React, { useState } from "react";

//Styles
import styles from "./UploadSummary.module.scss";
import { IoArrowUndo } from "react-icons/io5";
import Image from "next/image";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { uploadFile } from "../lib/actions/upload";
import toast from "react-hot-toast";
import { toastStyle } from "@/styles/toast";
import { useAuth } from "@/providers/AuthProvider";
import { useCollections } from "@/providers/CollectionsProvider";
import UploadSuccess from "./UploadSuccess";
//Icons
import { FaTags } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Gif } from "@/interfaces/gifs";
import { generateFileSize } from "../lib/utils/generateFileSize";
import { useUpload } from "@/providers/UploadProvider";
import { Sticker } from "@/interfaces/stickers";

interface UploadSummaryProps {
  //file: File | null;
  closeSummary: () => void;
}

const UploadSummary: React.FC<UploadSummaryProps> = ({ closeSummary }) => {
  const { username } = useAuth();
  const { media, setMedia } = useCollections();
  const { file } = useUpload();

  const [success, setSuccess] = useState<boolean>(false);
  const [tags, setTags] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const fileName = file?.name.split(".")[0];
  const fileExtension = file?.name.split(".").pop();

  const handleUpload = async () => {
    if (!file) return;
    setIsPending(true);
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);
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
        toast.error(result.error, {
          duration: 5000,
          style: toastStyle.style,
        });
        return;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsPending(false);
    }
  };

  // Create a URL for the file object
  // This URL can be used as the src for an <Image /> element
  const imageUrl = file ? URL.createObjectURL(file) : null;

  if (success && media) {
    return (
      <div className={styles.container}>
        <UploadSuccess closeSummary={closeSummary} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.backButtonContainer} onClick={closeSummary}>
        <IoArrowUndo />
        <span>Back</span>
      </h2>
      <div className={styles.innerWrapper}>
        <div className={styles.fileContainer}>
          <Image className={styles.image} src={imageUrl || ""} fill alt="" />
          <div className={styles.fileName}>
            <span className={styles.name}>{fileName}</span>
            <span className={styles.extension}>{fileExtension}</span>
            <span className={styles.size}>
              {file && generateFileSize(file)}
            </span>
          </div>
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
    </div>
  );
};

export default UploadSummary;
