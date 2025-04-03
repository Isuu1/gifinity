import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

//Styles
import styles from "./UserModal.module.scss";
import { toastStyle } from "@/styles/toast";
//Icons
import { FaUserAlt } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
//Animations
import { AnimatePresence, motion } from "framer-motion";
import {
  userModalAnimation,
  userModalMenuItemsAnimation,
} from "@/styles/animations";
//Actions
import { signout } from "@/features/auth/lib/actions/signout";

const UserModal: React.FC = () => {
  const { username, avatar } = useAuth();

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

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
    <div
      className={styles.modalContainer}
      onMouseEnter={handleModal}
      onMouseLeave={handleModal}
    >
      <Image
        className={styles.avatar}
        src={avatar || "/images/avatar.gif"}
        alt="user-avatar"
        width={45}
        height={45}
        priority
        unoptimized
      />
      <button className={styles.button}>{username}</button>
      <AnimatePresence>
        {showModal && (
          <motion.ul
            className={styles.modal}
            variants={userModalAnimation}
            animate="visible"
            initial="hidden"
            exit="exit"
          >
            <motion.li variants={userModalMenuItemsAnimation}>
              <Link href="/user/profile" className={styles.item}>
                <FaUserAlt />
                Profile
              </Link>
            </motion.li>

            <motion.li variants={userModalMenuItemsAnimation}>
              <Link href="/user/collections" className={styles.item}>
                <IoBookmarks />
                Collections
              </Link>
            </motion.li>

            <motion.li variants={userModalMenuItemsAnimation}>
              <Link href="/user/account-details" className={styles.item}>
                <IoSettings />
                Account details
              </Link>
            </motion.li>

            <motion.li
              className={styles.item}
              onClick={handleSignOut}
              variants={userModalMenuItemsAnimation}
            >
              <FaSignOutAlt />
              Sign out
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserModal;
