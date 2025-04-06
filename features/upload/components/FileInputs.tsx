import Button from "@/components/UI/Button";
import React, { useRef, useState } from "react";

//Styles
import styles from "./FileInputs.module.scss";
import Image from "next/image";

const FileInputs = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);

  console.log("dragActive", dragActive);
  console.log("file", file);

  const handleButtonClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFile(file);
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
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setFile(file);
      // if (inputRef.current) {
      //   inputRef.current.files = files;
      // }
    }
  };
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
        src="/images/drag-drop-icon4.svg"
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
