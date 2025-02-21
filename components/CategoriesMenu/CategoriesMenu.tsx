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
    setShowCategories(!showCategories);
  };

  //In category name replace & with -
  const replaceAnd = (categoryName: string) => {
    const slicedCategoryName = categoryName.substring(
      0,
      categoryName.indexOf("&")
    );
    return slicedCategoryName;
  };

  const handleCategoryChange = (categoryName: string) => {
    if (categoryName.includes("&")) {
      const newCategoryName = replaceAnd(categoryName);
      //router push path with category name
      router.push(`/category?q=${newCategoryName}`);
      return newCategoryName;
    } else {
      //router push path with category name
      router.push(`/category?q=${categoryName}`);
      return categoryName;
    }
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
