import React from "react";

//Styles
import styles from "./Button.module.scss";

interface IProps {
  children: string;
  onClick: () => void;
  icon: React.ReactNode;
  active: boolean;
}

const Button: React.FC<IProps> = ({ children, active, icon, onClick }) => {
  return (
    <button
      className={`${styles.button} ${active && styles.active}`}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default Button;
