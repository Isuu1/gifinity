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

interface IProps {
  categories: string[];
}

const CategoriesMenu: React.FC<IProps> = ({ categories }) => {
  const [showCategories, setShowCategories] = useState<boolean>(false);

  const handleCategories = () => {
    console.log("show", showCategories);
    setShowCategories(!showCategories);
  };

  const categoriesMenuAnimation = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.2, delayChildren: 0.4, staggerChildren: 0.1 },
    },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <div
      className={styles.categoriesContainer}
      onMouseEnter={handleCategories}
      onMouseLeave={handleCategories}
    >
      <button className={`${styles.button} ${showCategories && styles.active}`}>
        Categories
        <PiArrowBendRightDownBold className={styles.icon} />
      </button>

      <AnimatePresence>
        {showCategories && (
          <motion.ul
            className={styles.categoriesWrapper}
            variants={categoriesMenuAnimation}
            initial="hidden"
            animate={showCategories ? "visible" : "hidden"}
            exit="exit"
          >
            {categories.data.map((category: any, index: number) => (
              <motion.li
                key={index}
                className={styles.navItem}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button className={styles.button}>{category.name}</Button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoriesMenu;
