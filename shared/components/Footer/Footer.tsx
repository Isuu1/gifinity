import React from "react";
import Image from "next/image";

//Styles
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.copyright}>
        &copy; 2025 Gifinity. All rights reserved.
      </h3>
      <Image
        src="/images/attribution.gif"
        alt="Giphy Logo"
        width={200}
        height={42}
        className={styles.attribution}
        unoptimized
      />
    </footer>
  );
};

export default Footer;
