"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

//Styles
import styles from "./NavMenu.module.scss";

//Icons
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

const NavMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={styles.navMenu}>
        <div className={styles.avatarContainer}>
          <Image
            className={styles.avatar}
            src="/images/avatar.gif"
            fill
            alt="avatar"
            priority
            unoptimized
          />
          <h3>@Username</h3>
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
        <Link href="/user/favourites">
          <li
            className={`${styles.item} ${
              pathname === "/user/favourites" && styles.active
            }`}
          >
            <FaHeart />
            Favourites
          </li>
        </Link>
        <Link href="/user/account-details">
          <li
            className={`${styles.item} ${
              pathname === "/user/details" && styles.active
            }`}
          >
            <IoMdSettings />
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
