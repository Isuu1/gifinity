"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

//Styles
import styles from "./StickyHeader.module.scss";

//Context
import { useAuth } from "@/providers/AuthProvider";

//Components
import UserModal from "@/features/user/components/UserModal";

//Icons
//import { TiThMenu } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdCloudUpload } from "react-icons/md";

//Animations
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useStorage } from "@/providers/StorageProvider";
import HamburgerNavMenu from "@/shared/components/HamburgerNavMenu/HamburgerNavMenu";

const stickyHeaderAnimation = {
  initial: {
    y: -300,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { user } = useAuth();

  const { localFavouriteGifs, localFavouriteStickers } = useStorage();

  const itemsInFavourites =
    localFavouriteGifs.data.length + localFavouriteStickers.data.length;

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <motion.header
      className={styles.stickyHeader}
      variants={stickyHeaderAnimation}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
    >
      <div className={styles.stickyHeaderTop}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Gifinity" width={75} height={75} />
        </Link>
        <HamburgerNavMenu />
        <div className={styles.nav}>
          <Link href="/categories" scroll={false} className={styles.item}>
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
                Log in
              </Link>
              <Link href="/signup" scroll={false} className={styles.item}>
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
        </div>
        {user && <UserModal />}
      </div>
    </motion.header>
  );
};

export default StickyHeader;
