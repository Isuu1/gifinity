import React from "react";

//Styles
import styles from "./Error.module.scss";
//Icons
import { MdOutlineError } from "react-icons/md";

interface IProps {
  errorMessage: string;
}

const Error: React.FC<IProps> = ({ errorMessage }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>
        <MdOutlineError className={styles.icon} /> <span>{errorMessage}</span>
      </p>
    </div>
  );
};

export default Error;
