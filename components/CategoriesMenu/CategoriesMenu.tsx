"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Styles
import styles from "./CategoriesMenu.module.scss";

//Components

//Interfaces
import { Categories } from "@/interfaces/categories";

const CategoriesMenu: React.FC = () => {
  const [categories, setCategories] = useState<Categories>({ data: [] });

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("api/categories");
      const response = await data.json();

      setCategories(response);
    }
    fetchData();
  }, []);

  const router = useRouter();

  const handleCategoryChange = (categoryName: string) => {
    //Encode category name to handle special character '&'
    const encodedCategoryName = encodeURIComponent(categoryName);
    router.push(`/categories?q=${encodedCategoryName}`);
  };

  return (
    <div className={styles.categoriesContainer}>
      <ul className={styles.categoriesWrapper}>
        {categories.data.map((category, index: number) => (
          <li
            key={index}
            className={styles.navItem}
            onClick={() => handleCategoryChange(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesMenu;
