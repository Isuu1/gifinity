import React from "react";

//Styles
import styles from "./Upload.module.scss";
//Components
import FileInputs from "./FileInputs";
import UrlInput from "./UrlInput";

const Upload: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.uploadSection}>
        <FileInputs />
        <UrlInput />
      </div>
      <div className={styles.info}>
        <h1>
          <span className={styles.importantText}>Share</span> Your Awesome GIFs
          & Stickers!
        </h1>
        <h2>Just a few things to keep in mind for smooth uploading:</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.importantText}>File Types:</span>
            You can upload existing GIFs, or videos (MP4, MOV) up to{" "}
            <span className={styles.importantText}>15 seconds long</span> –
            we`ll handle the GIF conversion!
          </li>
          <li className={styles.item}>
            <span className={styles.importantText}>File Size:</span>
            Make sure your file is no bigger than{" "}
            <span className={styles.importantText}>100MB</span>.
          </li>
          <li className={styles.item}>
            <span className={styles.importantText}>
              Transparency is Key (for Stickers):
            </span>
            Uploading a sticker? Use a GIF or MOV file with a transparent
            background so it looks great everywhere!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Upload;
