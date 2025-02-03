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
    <header className={`${styles.header} page`}>
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
      <Search />
    </header>
  );
};

export default Header;
