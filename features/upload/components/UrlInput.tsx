"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Styles
import styles from "./UrlInput.module.scss";
//Components
import Input from "@/shared/components/UI/Input";
import Error from "@/shared/components/Error/Error";
//Icons
import { FaLink } from "react-icons/fa6";
//Providers
import { useUpload } from "@/providers/UploadProvider";

const UrlInput = () => {
  const { fileUrl, setFileUrl } = useUpload();

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUrl(null);
    const url = e.target.value;
    if (!url) {
      setError(null);
      return;
    }
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
      e.target.value = "";
    } else {
      setError("Invalid URL. Please enter a valid media URL.");
    }
  };

  useEffect(() => {
    //Once the fileUrl is set, redirect to the summary page
    if (fileUrl) {
      router.push("/upload/summary");
    }
  }, [fileUrl, router]);

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
