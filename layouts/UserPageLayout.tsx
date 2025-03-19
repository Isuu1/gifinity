import React from "react";

//Styles
import styles from "./UserPageLayout.module.scss";

const UserPageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={styles.userPageLayout}>{children}</div>;
};

export default UserPageLayout;
