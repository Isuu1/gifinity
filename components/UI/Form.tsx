import React from "react";

//Styles
import styles from "./Form.module.scss";

interface IProps {
  action?: (formData: FormData) => void;
  onSubmit?: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

const Form: React.FC<IProps> = ({ action, onSubmit, children }) => {
  return (
    <form className={styles.form} action={action} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
