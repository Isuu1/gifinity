import React from "react";

//Styles
import styles from "./PageHeadline.module.scss";
import Image from "next/image";

interface IProps {
  title: string;
  imageUrl: string;
}

const PageHeadline: React.FC<IProps> = ({ title, imageUrl }) => {
  return (
    <div className={styles.headline}>
      <Image src={imageUrl} alt="trending" width={40} height={40} />
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default PageHeadline;
