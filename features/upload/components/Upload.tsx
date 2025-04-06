"use client";

import React from "react";

//Styles
import styles from "./Upload.module.scss";
//Components
import Input from "@/components/UI/Input";
import FileInputs from "./FileInputs";
import { FaLink } from "react-icons/fa6";

const Upload: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.uploadSection}>
        <FileInputs />
        <div className={styles.urlInputContainer}>
          <h2>Send from url</h2>
          <h3 className={styles.description}>
            We support media URLs from GIPHY, YouTube, Vimeo, & many others!
          </h3>
          <Input
            icon={<FaLink />}
            id="url"
            label="url"
            placeholder="Paste your gif or sticker URL here"
            labelHidden
            type="text"
          />
        </div>
      </div>
      <div className={styles.info}>
        <h1>
          <span className={styles.importantText}>Share</span> Your Awesome GIFs
          & Stickers!
        </h1>
        <h2>Just a few things to keep in mind for smooth uploading:</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <strong>
              <span className={styles.importantText}>File Types:</span>
            </strong>{" "}
            You can upload existing GIFs, or videos (MP4, MOV) up to{" "}
            <span className={styles.importantText}>15 seconds long</span> –
            we`ll handle the GIF conversion!
          </li>
          <li className={styles.item}>
            <strong>
              <span className={styles.importantText}>File Size:</span>
            </strong>{" "}
            Make sure your file is no bigger than{" "}
            <span className={styles.importantText}>100MB</span>.
          </li>
          <li className={styles.item}>
            <strong>
              <span className={styles.importantText}>
                Transparency is Key (for Stickers):
              </span>
            </strong>{" "}
            Uploading a sticker? Use a GIF or MOV file with a transparent
            background so it looks great everywhere!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Upload;
