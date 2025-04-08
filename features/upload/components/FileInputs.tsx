import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//Styles
import styles from "./FileInputs.module.scss";
//Components
import Button from "@/components/UI/Button";
//Providers
import { useUpload } from "@/providers/UploadProvider";

const FileInputs = () => {
  const [dragActive, setDragActive] = useState<boolean>(false);

  const { file, setFile } = useUpload();

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleButtonClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setFile(file);

    // Reset the input value after processing the file
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Check if files are dropped
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  //Once the file is set, redirect to the summary page
  if (file) {
    router.push("/upload/summary");
  }

  return (
    <div
      className={`${styles.inputFieldsContainer} ${
        dragActive && styles.dragActive
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={() => setDragActive(false)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Image
        className={styles.image}
        src="/images/drag-drop-icon.svg"
        alt=""
        fill
      />
      <div className={styles.instruction}>
        <h2>Drag & drop your GIF or video here</h2>
        <span>
          Accepted formts: <strong>GIF, MP4, MOV, WEBP</strong>
        </span>
      </div>
      <Button
        onClick={handleButtonClick}
        className={styles.button}
        variant="light"
      >
        Choose file
      </Button>
      <input
        className={styles.fileInput}
        type="file"
        id="file"
        name="file"
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInputs;
