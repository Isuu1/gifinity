import React from "react";

//Styles
import styles from "./Error.module.scss";

interface IProps {
  errorMessage: string;
}

const Error: React.FC<IProps> = ({ errorMessage }) => {
  return <div className={styles.error}>{errorMessage}</div>;
};

export default Error;
