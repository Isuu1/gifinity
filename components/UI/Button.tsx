import React from "react";

//Styles
import styles from "./Button.module.scss";

interface IProps {
  children: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  active?: boolean;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<IProps> = ({
  children,
  active,
  icon,
  onClick,
  iconPosition,
  className,
  disabled,
  type = "button",
}) => {
  return (
    <button
      className={`${styles.button} ${className} ${active && styles.active}`}
      onClick={onClick}
      style={{
        flexDirection: iconPosition === "right" ? "row-reverse" : "row",
      }}
      disabled={disabled}
      type={type}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default Button;
