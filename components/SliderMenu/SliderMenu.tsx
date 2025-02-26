"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Styles
import styles from "./SliderMenu.module.scss";

//Components
import Button from "../UI/Button";

//Icons
import { FaFireFlameSimple } from "react-icons/fa6";

//Utils
import { fetchTrendingSearches } from "@/utils/client";

interface TrendingTags {
  data: string[];
}

const SliderMenu: React.FC = () => {
  const [items, setItems] = useState<TrendingTags | null>(null);

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/trending?q=${tag}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      const trendingSearches = await fetchTrendingSearches();

      if (trendingSearches.error) setError(trendingSearches.error);

      if (trendingSearches.data) setItems(trendingSearches.data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.sliderMenuContainer}>
      {error !== null && <h3 className={styles.error}>{error}</h3>}
      <div className={styles.sliderMenuInnerWrapper}>
        {/* Render two sets of items for a seamless effect */}
        {items !== null &&
          [...items.data, ...items.data].map((item, index) => (
            <div key={index} className={styles.sliderMenuItem}>
              <Button
                icon={<FaFireFlameSimple />}
                onClick={() => handleTagClick(item)}
              >
                {item}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SliderMenu;
