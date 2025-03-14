"use client";

import React from "react";
import Link from "next/link";

//Styles
import styles from "./Header.module.scss";

//Components
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import Button from "../UI/Button";
import Search from "../Search/Search";
import SignoutButton from "../Authentication/SignoutButton/SignoutButton";

//Icons
import { FaHeart } from "react-icons/fa";

//Supabase
import { User } from "@supabase/supabase-js";
import Image from "next/image";

interface IProps {
  user: User | null;
}

const Header: React.FC<IProps> = ({ user }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Gifinity" width={95} height={95} />
        </Link>
        <div className={styles.nav}>
          <CategoriesMenu />
          {user ? (
            <>
              <Link href="/user/profile">
                <Button>User profile</Button>
              </Link>
              <SignoutButton />
            </>
          ) : (
            <>
              <Link href="/login" scroll={false}>
                <Button>Log in</Button>
              </Link>
              <Link href="/signup" scroll={false}>
                <Button variant="light">Sign up</Button>
              </Link>
              <Link href="/favourites">
                <Button icon={<FaHeart color="#ff204e" />} iconPosition="right">
                  Favourites
                </Button>
              </Link>
            </>
          )}
        </div>
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
