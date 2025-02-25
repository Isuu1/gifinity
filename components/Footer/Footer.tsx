import React from "react";

//Styles
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.copyright}>
        &copy; 2025 Gifinity. All rights reserved.
      </h3>
    </footer>
  );
};

export default Footer;
