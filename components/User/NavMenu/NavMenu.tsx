import React from "react";

//Styles
import styles from "./NavMenu.module.scss";

//Icons
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";

const NavMenu: React.FC = () => {
  return (
    <nav>
      <ul className={styles.navMenu}>
        <li className={styles.item}>
          <FaUserAlt />
          Profile
        </li>
        <li className={styles.item}>
          <FaHeart />
          Favourites
        </li>
        <li className={styles.item}>
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
