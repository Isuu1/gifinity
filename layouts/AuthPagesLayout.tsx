import React from "react";

//Styles
import styles from "./AuthPagesLayout.module.scss";

const AuthPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.authPageLayout}>
      <div className={styles.formWrapper}>
        <h1>Gifinity</h1>
        <div className={styles.form}>{children}</div>
      </div>
      <div className={styles.authBackground}></div>
    </div>
  );
};

export default AuthPagesLayout;
