"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

//Styles
import styles from "./UserNavMenu.module.scss";

//Icons
import { FaUserAlt } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";

import { IoSettings } from "react-icons/io5";

import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const NavMenu: React.FC = () => {
  const pathname = usePathname();

  const { avatar, username } = useAuth();

  return (
    <nav>
      <ul className={styles.navMenu}>
        <div className={styles.avatarContainer}>
          <Image
            className={styles.avatar}
            src={avatar || "/images/avatar.gif"}
            fill
            alt="avatar"
            priority
            unoptimized
          />
          <h3>@{username}</h3>
        </div>
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
        <li className={styles.item}>
          <FaSignOutAlt />
          Sign out
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
