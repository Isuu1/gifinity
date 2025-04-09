import React from "react";

//Styles
import styles from "./UrlInput.module.scss";
//Components
import Input from "@/components/UI/Input";
//Icons
import { FaLink } from "react-icons/fa6";

const UrlInput = () => {
  return (
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
  );
};

export default UrlInput;
