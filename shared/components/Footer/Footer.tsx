import React from "react";

//Styles
import styles from "./Footer.module.scss";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.copyright}>
        &copy; 2025 Gifinity. All rights reserved.
      </h3>
      {/* <h3 className={styles.attribution}>Powered By GIPHY</h3> */}
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
