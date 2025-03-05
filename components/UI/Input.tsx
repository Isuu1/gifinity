import React from "react";

//Styles
import styles from "./Input.module.scss";

interface IProps {
  id: string;
  label: string;
  type: string;
  labelHidden: boolean;
  required?: boolean;
  theme: "light" | "dark" | "white";
}

const Input: React.FC<IProps> = ({
  label,
  labelHidden,
  id,
  type,
  theme,
  required,
}) => {
  return (
    <div>
      <label htmlFor={label}>{!labelHidden && label}</label>
      <input
        className={`${styles.input} ${styles[theme]}`}
        required={required}
        id={id}
        name={id}
        type={type}
      />
    </div>
  );
};

export default Input;
