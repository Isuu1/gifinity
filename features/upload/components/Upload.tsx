import React from "react";

//Styles
import styles from "./Upload.module.scss";
//Components
import FileInputs from "./FileInputs";
import UrlInput from "./UrlInput";
import { createClient } from "@/supabase/server";
import Button from "@/shared/components/UI/Button";
import Link from "next/link";

const Upload: React.FC = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("No session found, redirecting to login page...");
    return (
      <div className={styles.notLoggedIn}>
        <h2>Please log in to upload gifs and stickers.</h2>
        <div className={styles.buttons}>
          <Link href="/login">
            <Button variant="light">Log In</Button>
          </Link>
          <Link href="/">
            <Button variant="dark">Go back to home page</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.uploadSection}>
        <FileInputs />
        <UrlInput />
      </div>
      <div className={styles.infoSection}>
        <h1>
          <span className={styles.importantText}>Share</span> Your Awesome GIFs
          & Stickers!
        </h1>
        <h2>Just a few things to keep in mind for smooth uploading:</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.importantText}>File Types:</span>
            You can upload existing GIFs, or videos (MP4, MOV) up to 15 seconds
            long – we`ll handle the GIF conversion!
          </li>
          <li className={styles.item}>
            <span className={styles.importantText}>File Size:</span>
            Make sure your file is no bigger than 100MB.
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
