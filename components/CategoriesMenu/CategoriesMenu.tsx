"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

//Interfaces
import { Categories } from "@/interfaces/categories";

const CategoriesMenu: React.FC = () => {
  const [showCategories, setShowCategories] = useState<boolean>(false);

  const [categories, setCategories] = useState<Categories>({ data: [] });

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("api/categories");
      const response = await data.json();

      setCategories(response);
    }
    fetchData();
  }, []);
  console.log(categories);
  const router = useRouter();

  const handleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryChange = (categoryName: string) => {
    //Encode category name to handle special character '&'
    const encodedCategoryName = encodeURIComponent(categoryName);
    router.push(`/category?q=${encodedCategoryName}`);
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
            {categories.data.map((category, index: number) => (
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
