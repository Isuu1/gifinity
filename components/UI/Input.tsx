import React from "react";

//Styles
import styles from "./Input.module.scss";

interface IProps {
  id: string;
  label: string;
  type: string;
  labelHidden: boolean;
  required?: boolean;
  background: "light" | "dark";
}

const Input: React.FC<IProps> = ({
  label,
  labelHidden,
  id,
  type,
  background,
  required,
}) => {
  return (
    <div>
      <label htmlFor={label}>{!labelHidden && label}</label>
      <input
        className={`${styles.input} ${
          background === "light" ? styles.light : styles.dark
        }`}
        required={required}
        id={id}
        name={id}
        type={type}
      />
    </div>
  );
};

export default Input;
