"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

//Styles
import styles from "./Header.module.scss";

//Components
import Search from "../../features/search/components/Search";
import UserModal from "../../features/user/components/UserModal";

//Icons
import { FaHeart } from "react-icons/fa";

//Context
import { useAuth } from "@/context/AuthProvider";

//Animations
import { useMotionValueEvent, useScroll } from "motion/react";

const Header: React.FC = () => {
  const { user } = useAuth();

  const { scrollY } = useScroll();

  const headerRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (headerRef.current) {
      if (latest > 300) {
        headerRef.current.style.opacity = "0";
      } else {
        headerRef.current.style.opacity = "1";
      }
    }
  });

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.headerTop}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Gifinity" width={95} height={95} />
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
      <div className={styles.headerBottom}>
        <h2>Find the Perfect GIF for Every Moment!</h2>
        <p>
          Explore a world of fun with trending GIFs and stickers. Search, share,
          and express yourself!
        </p>
      </div>
      <Search />
    </header>
  );
};

export default Header;
