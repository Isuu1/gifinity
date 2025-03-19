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

        <li
          className={`${styles.item} ${
            pathname === "/user/profile" && styles.active
          }`}
        >
          <FaUserAlt />
          Profile
        </li>
        <li
          className={`${styles.item} ${
            pathname === "/user/favourites" && styles.active
          }`}
        >
          <FaHeart />
          Favourites
        </li>
        <li
          className={`${styles.item} ${
            pathname === "/user/details" && styles.active
          }`}
        >
          <IoMdSettings />
          Account details
        </li>
        <li className={styles.item}>
          <FaSignOutAlt />
          Sign out
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
