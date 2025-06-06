"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

//Styles
import styles from "./UserNavMenu.module.scss";
import { toastStyle } from "@/shared/styles/toast";
//Icons
import { FaUserAlt } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
//Providers
import { useAuth } from "@/providers/AuthProvider";
//Actions
import { signout } from "@/features/auth/lib/actions/signout";
import ChangeUserAvatar from "./ChangeUserAvatar";

const NavMenu: React.FC = () => {
  const pathname = usePathname();

  const { avatar, username } = useAuth();

  const handleSignOut = async () => {
    const result = await signout();
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("You've safely signed out.", toastStyle);
      setTimeout(() => {
        window.location.pathname = "/";
      }, 1000);
    }
  };

  return (
    <nav>
      <div className={styles.navMenuContainer}>
        <div className={styles.avatarContainer}>
          <Image
            className={styles.avatar}
            src={avatar || "/images/avatar.gif"}
            fill
            alt="avatar"
            priority
            unoptimized
          />
          <h3 className={styles.username}>@{username}</h3>
          <ChangeUserAvatar />
        </div>
        <ul className={styles.navMenu}>
          <Link href="/user/profile">
            <li
              className={`${styles.item} ${
                pathname === "/user/profile" && styles.active
              }`}
            >
              <FaUserAlt />
              Profile
            </li>
          </Link>
          <Link href="/user/collections">
            <li
              className={`${styles.item} ${
                pathname.startsWith("/user/collections") && styles.active
              }`}
            >
              <IoBookmarks />
              Collections
            </li>
          </Link>
          <Link href="/user/account-details">
            <li
              className={`${styles.item} ${
                pathname === "/user/account-details" && styles.active
              }`}
            >
              <IoSettings />
              Account details
            </li>
          </Link>
          <li className={styles.item} onClick={handleSignOut}>
            <FaSignOutAlt />
            Sign out
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
