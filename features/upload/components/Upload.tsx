import React from "react";

//Styles
import styles from "./Upload.module.scss";
import Image from "next/image";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";

const Upload: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.uploadField}>
        <div className={styles.inputFieldsContainer}>
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
            <Button className={styles.button} variant="light">
              Choose file
            </Button>
          </div>
        </div>
        <div className={styles.urlInputContainer}>
          <h3>Send from url</h3>
          <h4>
            We support media URLs from GIPHY, YouTube, Vimeo, & many others!
          </h4>
          <Input id="url" label="url" labelHidden type="text" />
        </div>
      </div>
      <div className={styles.info}>
        <h1>Share Your Awesome GIFs & Stickers!</h1>
        <h2>Just a few things to keep in mind for smooth uploading:</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <strong>
              <span className={styles.importantText}>File Types:</span>
            </strong>{" "}
            You can upload existing GIFs, or videos (MP4, MOV) up to 15 seconds
            long – we`ll handle the GIF conversion!
          </li>
          <li className={styles.item}>
            <strong>File Size:</strong> Make sure your file is no bigger than
            100MB.
          </li>
          <li className={styles.item}>
            <strong>Transparency is Key (for Stickers):</strong> Uploading a
            sticker? Use a GIF or MOV file with a transparent background so it
            looks great everywhere!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Upload;
