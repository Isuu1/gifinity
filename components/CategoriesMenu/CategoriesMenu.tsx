"use client";

import React, { useState } from "react";

//Icons
import { PiArrowBendRightDownBold } from "react-icons/pi";

//Styles
import styles from "./CategoriesMenu.module.scss";

//Components
import Button from "../UI/Button";

//Animation
import { AnimatePresence, motion } from "framer-motion";
import {
  categoriesMenuAnimation,
  categoryMenuItemsAnimation,
} from "@/styles/animations";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Category {
  name: string;
}

interface IProps {
  categories: Category[];
}

const CategoriesMenu: React.FC<IProps> = ({ categories }) => {
  const [showCategories, setShowCategories] = useState<boolean>(false);

  const router = useRouter();

  const handleCategories = () => {
    console.log("show", showCategories);
    setShowCategories(!showCategories);
  };

  const handleCategoryChange = (categoryName: string) => {
    //router push path with category name
    router.push(`/category?q=${categoryName}`);
    if (categoryName.includes("&")) {
      const newCategoryName = replaceAnd(categoryName);
      return newCategoryName;
    }
    return categoryName;
  };

  //In category name replace & with -
  const replaceAnd = (categoryName: string) => {
    return categoryName.replace("&", "-");
  };

  return (
    <div
      className={styles.categoriesContainer}
      onMouseEnter={handleCategories}
      onMouseLeave={handleCategories}
    >
      <button className={`${styles.button} ${showCategories && styles.active}`}>
        Categories
        <PiArrowBendRightDownBold
          className={`${styles.icon} ${
            showCategories && styles.rotateAnimation
          }`}
        />
      </button>

      <AnimatePresence mode="wait">
        {showCategories && (
          <motion.ul
            className={styles.categoriesWrapper}
            variants={categoriesMenuAnimation}
            initial="hidden"
            animate={showCategories ? "visible" : "hidden"}
            exit="exit"
          >
            {categories.map((category, index: number) => (
              <motion.li
                key={index}
                className={styles.navItem}
                variants={categoryMenuItemsAnimation}
              >
                <Button
                  className={styles.button}
                  onClick={() => handleCategoryChange(category.name)}
                >
                  {category.name}
                </Button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoriesMenu;
