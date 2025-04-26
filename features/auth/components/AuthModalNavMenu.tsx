import React from "react";

//Components
import Button from "@/shared/components/UI/Button";

//Styles
import styles from "./AuthModalNavMenu.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface IProps {
  variant?: "light" | "dark";
}

const ModalNavMenu: React.FC<IProps> = ({ variant = "default" }) => {
  const pathname = usePathname();

  return (
    <div className={`${styles.modalNavMenuContainer} ${styles[variant]}`}>
      <Link href="/login">
        <Button active={pathname === "/login"}>Login</Button>
      </Link>
      <Link href="/signup">
        <Button active={pathname === "/signup"}>Signup</Button>
      </Link>
    </div>
  );
};

export default ModalNavMenu;
