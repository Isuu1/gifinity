import Link from "next/link";
import React, { useEffect, useState } from "react";

//Icons
import { FaHeart } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdCloudUpload } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { LuLogIn } from "react-icons/lu";

//Styles
import styles from "./HamburgerNavMenu.module.scss";
//Providers
import { useAuth } from "@/providers/AuthProvider";
import { useStorage } from "@/providers/StorageProvider";
//Animations
import { AnimatePresence, motion } from "framer-motion";

const hamburgerMenuVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

const HamburgerNavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useAuth();

  const { localFavouriteGifs, localFavouriteStickers } = useStorage();

  const itemsInFavourites =
    localFavouriteGifs.data.length + localFavouriteStickers.data.length;

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(`.${styles.hamburgerNavMenuContainer}`)) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className={styles.hamburgerNavMenuContainer}>
      <HiMenuAlt3
        className={styles.icon}
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.nav}
            variants={hamburgerMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link
              href="/categories?q=actions"
              scroll={false}
              className={styles.item}
            >
              <BiSolidCategory />
              Categories
            </Link>
            <Link href="#" scroll={false} className={styles.item}>
              <MdCloudUpload />
              Upload
            </Link>
            {!user && (
              <>
                <Link href="/login" scroll={false} className={styles.item}>
                  <LuLogIn />
                  Log in
                </Link>
                <Link href="/signup" scroll={false} className={styles.item}>
                  <LuLogIn />
                  Sign up
                </Link>
                <Link
                  href="/favourites"
                  className={`${styles.item} ${styles.favourites}`}
                >
                  <span className={styles.counter}>{itemsInFavourites}</span>
                  <FaHeart color="#ff204e" />
                  Favourites
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerNavMenu;
