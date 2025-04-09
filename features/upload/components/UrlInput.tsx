"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

//Styles
import styles from "./UrlInput.module.scss";
//Components
import Input from "@/components/UI/Input";
import Error from "@/components/Error/Error";
//Icons
import { FaLink } from "react-icons/fa6";
//Providers
import { useUpload } from "@/providers/UploadProvider";

const UrlInput = () => {
  const { fileUrl, setFileUrl } = useUpload();

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    //Fetch the URL to check if it is valid
    const response = await fetch(url, { method: "HEAD", mode: "cors" });
    //Check if the response headers contain a content type that is accepted
    const contentType = response.headers.get("Content-Type");
    if (
      contentType?.startsWith("video/") ||
      contentType?.startsWith("image/")
    ) {
      setFileUrl(url);
      setError(null);
    } else {
      setError("Invalid URL. Please enter a valid media URL.");
    }
  };

  if (fileUrl) {
    router.push("/upload/summary");
  }

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
        onChange={handleUrlChange}
      />
      {error && <Error errorMessage={error} />}
    </div>
  );
};

export default UrlInput;
