import React from "react";

//Utils
import { getCategories } from "@/utils/utils";

//Styles
import styles from "./Header.module.scss";

//Components
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import Button from "../UI/Button";
import Search from "../Search/Search";

//Icons
import { TbArrowsRandom } from "react-icons/tb";

const Header: React.FC = async () => {
  const categories = await getCategories();

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1>Gifinity</h1>
        <div className={styles.nav}>
          <CategoriesMenu categories={categories} />
          <Button icon={<TbArrowsRandom />} iconPosition="right">
            Random
          </Button>
          <Button>User profile</Button>
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
