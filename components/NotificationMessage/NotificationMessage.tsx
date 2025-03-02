import React from "react";

//Styles
import styles from "./NotificationMessage.module.scss";

interface IProps {
  children: string;
}

const NotificationMessage: React.FC<IProps> = ({ children }) => {
  return (
    <div className={styles.notification}>
      <h4>{children}</h4>
    </div>
  );
};

export default NotificationMessage;
