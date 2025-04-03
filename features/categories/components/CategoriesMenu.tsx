"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Styles
import styles from "./CategoriesMenu.module.scss";
//Components
import Error from "@/components/Error/Error";
//Types
import { Categories } from "@/interfaces/categories";

const CategoriesMenu: React.FC = () => {
  const [categories, setCategories] = useState<Categories>({ data: [] });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  console.log(categories);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await fetch("api/categories");
        if (!data.ok) {
          setError("There was an error fetching the categories.");
          return;
        }
        const response = await data.json();

        setCategories(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const router = useRouter();

  const handleCategoryChange = (categoryName: string) => {
    //Encode category name to handle special character '&'
    const encodedCategoryName = encodeURIComponent(categoryName);
    router.push(`/categories?q=${encodedCategoryName}`);
  };

  if (error)
    return (
      <div className={styles.categoriesContainer}>
        <Error errorMessage={error} />
      </div>
    );

  if (isLoading)
    return (
      <div className={styles.categoriesContainer}>
        <ul className={styles.categoriesWrapper}>
          {Array.from({ length: 28 }).map((category, index: number) => (
            <li key={index} className={styles.navItem}>
              <span>Loading</span>
            </li>
          ))}
        </ul>
      </div>
    );

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
