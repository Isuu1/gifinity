import React from "react";
import { usePathname } from "next/navigation";

//Components
import Button from "@/components/UI/Button";

//Styles
import styles from "./AuthPageNavMenu.module.scss";

interface IProps {
  variant?: "light" | "dark";
}

const ModalNavMenu: React.FC<IProps> = ({ variant = "default" }) => {
  const pathname = usePathname();

  return (
    <div className={`${styles.authPageNavMenuContainer} ${styles[variant]}`}>
      {/* Use classic 'a' tag to avoid routes being intercepted */}
      <a href="/login">
        <Button active={pathname === "/login"}>Login</Button>
      </a>
      <a href="/signup">
        <Button active={pathname === "/signup"}>Signup</Button>
      </a>
    </div>
  );
};

export default ModalNavMenu;
