import React from "react";
import Link from "next/link";

//Utils
import { getCategories } from "@/utils/api";

//Styles
import styles from "./Header.module.scss";

//Components
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import Button from "../UI/Button";
import Search from "../Search/Search";

//Icons
import { FaHeart } from "react-icons/fa";

const Header: React.FC = async () => {
  const categories = await getCategories();

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Link href="/">
          <h1>Gifinity</h1>
        </Link>
        <div className={styles.nav}>
          <CategoriesMenu categories={categories.data} />
          {/* <Link href="/user/profile">
            <Button>User profile</Button>
          </Link> */}
          <Button>Log in</Button>
          <Button active>Sign up</Button>
          <Button icon={<FaHeart color="#ff204e" />} iconPosition="right">
            Favourites
          </Button>
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
