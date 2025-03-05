import React from "react";

//Styles
import styles from "./Form.module.scss";

interface IProps {
  action: (formData: FormData) => void;
  children: React.ReactNode;
}

const Form: React.FC<IProps> = ({ action, children }) => {
  return (
    <form className={styles.form} action={action}>
      {children}
    </form>
  );
};

export default Form;
