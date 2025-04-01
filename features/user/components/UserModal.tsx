import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";

//Styles
import styles from "./UserModal.module.scss";
import Image from "next/image";
import Link from "next/link";

//Icons
import { FaUserAlt } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import { AnimatePresence, motion } from "framer-motion";
import {
  userModalAnimation,
  userModalMenuItemsAnimation,
} from "@/styles/animations";

const UserModal: React.FC = () => {
  const { username, avatar } = useAuth();

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    async function signOut() {
      const { error } = await supabase.auth.signOut();
      router.refresh();
      if (error) {
        console.error("Error logging out:", error.message);
        return;
      }
    }
    signOut();
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
                <BsFillCollectionFill />
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
