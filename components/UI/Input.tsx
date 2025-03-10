import React from "react";
import { Neucha } from "next/font/google";

//Styles
import styles from "./Input.module.scss";

interface IProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  labelHidden?: boolean;
  required?: boolean;
  defaultValue?: string;
  value?: string;
  icon?: React.ReactNode;
  theme: "light" | "dark" | "white";
  onFocus?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const neucha = Neucha({
  subsets: ["latin"],
  weight: "400",
});

const Input: React.FC<IProps> = ({
  label,
  labelHidden,
  id,
  type,
  theme,
  required,
  defaultValue,
  value,
  placeholder,
  icon,
  onFocus,
  onChange,
}) => {
  //Icon color is based on the theme
  const iconColor = theme === "white" ? "dark" : "white";
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label}>{!labelHidden && label}</label>
      <div className={`${styles.inputIcon} ${styles[iconColor]}`}>{icon}</div>
      <input
        placeholder={placeholder}
        className={`${styles.input} ${styles[theme]} ${neucha.className}`}
        required={required}
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
