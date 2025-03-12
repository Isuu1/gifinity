import React from "react";

//Styles
import styles from "./AuthPagesLayout.module.scss";

const AuthPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.authPageLayout}>
      <h1>Gifinity</h1>
      <div className={styles.innerWrapper}>{children}</div>
    </div>
  );
};

export default AuthPagesLayout;
