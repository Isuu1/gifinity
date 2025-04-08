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
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  icon?: React.ReactNode;
  showPasswordIcon?: React.ReactNode;
  variant?: "light" | "dark";
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
  variant = "default",
  required,
  disabled,
  defaultValue,
  value,
  placeholder,
  icon,
  showPasswordIcon,
  onFocus,
  onChange,
}) => {
  return (
    <div className={`${styles.inputContainer} ${styles[variant]}`}>
      <label className={styles.label} htmlFor={label}>
        {!labelHidden && label}
      </label>
      <div className={`${styles.inputIcon}`}>{icon}</div>
      <div className={`${styles.showPasswordIcon}`}>{showPasswordIcon}</div>
      <input
        placeholder={placeholder}
        className={`${styles.input} ${neucha.className}`}
        required={required}
        disabled={disabled}
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
