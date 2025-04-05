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
import { BiSolidCategory } from "react-icons/bi";
import { MdCloudUpload } from "react-icons/md";

//Context
import { useAuth } from "@/providers/AuthProvider";

//Animations
import { useMotionValueEvent, useScroll } from "motion/react";
import { useStorage } from "@/providers/StorageProvider";
import HamburgerNavMenu from "../HamburgerNavMenu/HamburgerNavMenu";

const Header: React.FC = () => {
  const { user, isLoading } = useAuth();

  const { localFavouriteGifs, localFavouriteStickers } = useStorage();

  const itemsInFavourites =
    localFavouriteGifs.data.length + localFavouriteStickers.data.length;

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

  if (isLoading)
    return (
      <header className={styles.header} ref={headerRef}>
        <div className={styles.headerTop}>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Gifinity"
              width={95}
              height={95}
            />
          </Link>
        </div>
        <div className={styles.headerBottom}>
          <h2>Find the Perfect GIF for Every Moment!</h2>
          <p>
            Explore a world of fun with trending GIFs and stickers. Search,
            share, and express yourself!
          </p>
        </div>
        <Search />
      </header>
    );

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.headerTop}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Gifinity" width={95} height={95} />
        </Link>
        <HamburgerNavMenu />
        <div className={styles.nav}>
          <Link
            href="/categories?q=actions"
            scroll={false}
            className={styles.item}
          >
            <BiSolidCategory />
            Categories
          </Link>
          <Link href="/upload" scroll={false} className={styles.item}>
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
