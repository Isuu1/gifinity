"use client";

import React, { useState } from "react";

//Styles
import styles from "./UploadSummary.module.scss";
import { IoArrowUndo } from "react-icons/io5";
import Image from "next/image";
import Modal from "@/components/UI/Modal";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { uploadFile } from "../lib/actions/upload";
import toast from "react-hot-toast";
import { toastStyle } from "@/styles/toast";
import { useAuth } from "@/providers/AuthProvider";

interface UploadSummaryProps {
  file: File | null;
  closeSummary: () => void;
}

const UploadSummary: React.FC<UploadSummaryProps> = ({
  file,
  closeSummary,
}) => {
  const { username } = useAuth();

  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileName = file?.name.split(".")[0];
  const fileExtension = file?.name.split(".").pop();

  const generateFileSize = () => {
    if (!file) return "";
    if (file.size < 1024) {
      return `${file.size} bytes`;
    } else if (file.size < 1048576) {
      return `${(file.size / 1024).toFixed(2)} KB`;
    } else {
      return `${(file.size / 1048576).toFixed(2)} MB`;
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);
    // Pass formData to server action
    const result = await uploadFile(formData);
    console.log("result", result);
    if (result.success) {
      console.log("File uploaded successfully");
      setUploadSuccess(true);
    }
    if (result.error) {
      toast.error(result.error, {
        duration: 5000,
        style: toastStyle.style,
      });
      return;
    }
  };

  // Create a URL for the file object
  // This URL can be used as the src for an <Image /> element
  const imageUrl = file ? URL.createObjectURL(file) : null;
  console.log("imageurl", imageUrl);
  return (
    <Modal theme="dark">
      <div className={styles.container}>
        <h2
          className={styles.backButtonContainer}
          onClick={() => closeSummary()}
        >
          <IoArrowUndo />
          <span>Back</span>
        </h2>
        <div className={styles.innerWrapper}>
          <div className={styles.fileContainer}>
            <Image className={styles.image} src={imageUrl || ""} fill alt="" />
            <div className={styles.fileName}>
              <span className={styles.name}>{fileName}</span>
              <span className={styles.extension}>{fileExtension}</span>
              <span className={styles.size}>{generateFileSize()}</span>
            </div>
          </div>
          <div>
            <h2>Add image info</h2>
            <Input id="tags" type="text" label="tags" />
            <Input
              id="username"
              label="username"
              type="text"
              value={username}
              disabled
            />
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Button>Cancel</Button>
          <Button variant="light" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadSummary;
