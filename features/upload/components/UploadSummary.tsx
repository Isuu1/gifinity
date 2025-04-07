"use client";

import React from "react";

//Styles
import styles from "./UploadSummary.module.scss";
import { IoArrowUndo } from "react-icons/io5";
import Image from "next/image";
import Modal from "@/components/UI/Modal";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

interface UploadSummaryProps {
  file: File | null;
  closeSummary: () => void;
}

const UploadSummary: React.FC<UploadSummaryProps> = ({
  file,
  closeSummary,
}) => {
  console.log(file);

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
          <div className={styles.imageContainer}>
            <Image className={styles.image} src={imageUrl || ""} fill alt="" />
            <div className={styles.fileName}>{file && file.name}</div>
          </div>
          <div>
            <h2>Add image info</h2>
            <Input />
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Button>Cancel</Button>
          <Button variant="light">Upload</Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadSummary;
