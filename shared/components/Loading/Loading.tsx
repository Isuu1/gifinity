import React from "react";

//Styles
import styles from "./Loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <span className={styles.element}></span>
    </div>
  );
};

export default Loading;
