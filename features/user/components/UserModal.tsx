import { useAuth } from "@/providers/AuthProvider";
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
//Actions
import { signout } from "@/features/auth/lib/actions/signout";

const userModalVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "200px",
    transition: {
      ease: "linear",
      duration: 0.2,
      delayChildren: 0.1,
      staggerChildren: 0.02,
    },
  },
  exit: { opacity: 0, height: 0 },
};

export const userModalMenuItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

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
            variants={userModalVariants}
            animate="visible"
            initial="hidden"
            exit="exit"
          >
            <motion.li variants={userModalMenuItemVariants}>
              <Link href="/user/profile" className={styles.item}>
                <FaUserAlt />
                Profile
              </Link>
            </motion.li>

            <motion.li variants={userModalMenuItemVariants}>
              <Link href="/user/collections" className={styles.item}>
                <IoBookmarks />
                Collections
              </Link>
            </motion.li>

            <motion.li variants={userModalMenuItemVariants}>
              <Link href="/user/account-details" className={styles.item}>
                <IoSettings />
                Account details
              </Link>
            </motion.li>

            <motion.li
              className={styles.item}
              onClick={handleSignOut}
              variants={userModalMenuItemVariants}
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
