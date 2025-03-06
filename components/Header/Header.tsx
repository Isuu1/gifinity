"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

//Styles
import styles from "./Header.module.scss";

//Components
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import Button from "../UI/Button";
import Search from "../Search/Search";

//Icons
import { FaHeart } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

//Supabase
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

interface IProps {
  user: User | null;
}

const Header: React.FC<IProps> = ({ user }) => {
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
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Link href="/">
          <h1>Gifinity</h1>
        </Link>
        <div className={styles.nav}>
          <CategoriesMenu />
          {user ? (
            <>
              <Link href="/user/profile">
                <Button>User profile</Button>
              </Link>
              <Button
                onClick={handleSignOut}
                icon={<FaSignOutAlt />}
                iconPosition="right"
              >
                Sign out
              </Button>
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
