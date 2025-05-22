import React from "react";
import Image from "next/image";

//Styles
import styles from "./PageHeadline.module.scss";

interface PageHeadlineProps {
  title: string;
  imageUrl: string;
}

const PageHeadline: React.FC<PageHeadlineProps> = ({ title, imageUrl }) => {
  return (
    <div className={styles.headline}>
      <Image src={imageUrl} alt="trending" width={40} height={40} priority />
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default PageHeadline;
