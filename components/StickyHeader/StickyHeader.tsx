"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

//Styles
import styles from "./StickyHeader.module.scss";

//Context
import { useAuth } from "@/context/AuthProvider";

//Components
import UserModal from "../../features/user/components/UserModal";
import Search from "../../features/search/components/Search";

//Icons
//import { TiThMenu } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";

//Animations
import { motion, useMotionValueEvent, useScroll } from "motion/react";

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
        <div className={styles.nav}>
          <Link href="/categories" scroll={false} className={styles.item}>
            Categories
          </Link>
          <Link href="#" scroll={false} className={styles.item}>
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
              <Link href="/favourites" className={styles.item}>
                <FaHeart color="#ff204e" />
                Favourites
              </Link>
            </>
          )}
        </div>
        {user && <UserModal />}
      </div>

      <Search />
    </motion.header>
  );
};

export default StickyHeader;
