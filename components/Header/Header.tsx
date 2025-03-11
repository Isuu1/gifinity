"use client";

import React, { useEffect } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface IProps {
  user: User | null;
}

const Header: React.FC<IProps> = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const token = searchParams.get("code");
  const supabase = createClient();

  // useEffect(() => {
  //   if (token && pathname === "/") {
  //     router.replace(`/reset-password?code=${token}`);
  //   }
  // }, [token, router, pathname]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("PASSWORD_RECOVERY", session);
      }
    });
  }, [supabase, router]);

  console.log(user);
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Link href="/">
          <h1>Gifinity</h1>
        </Link>
        <div className={styles.nav}>
          <CategoriesMenu />
          {user && !pathname.startsWith("/reset-password") ? (
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
                <Button active>Sign up</Button>
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
