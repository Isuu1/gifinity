"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Styles
import styles from "./TrendingSearchesSlider.module.scss";

//Components
import Button from "../UI/Button";

//Icons
import { FaFireFlameSimple } from "react-icons/fa6";

interface TrendingSearches {
  data: string[];
}

const TrendingSearchesSlider: React.FC = () => {
  const [trendingSearches, setTrendingSearches] = useState<TrendingSearches>({
    data: [],
  });

  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/trending?q=${tag}`);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("api/trending-searches");
      const response = await data.json();

      setTrendingSearches(response);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.sliderMenuContainer}>
      <div className={styles.sliderMenuInnerWrapper}>
        {/* Render two sets of items for a seamless effect */}
        {trendingSearches.data
          ? [...trendingSearches.data, ...trendingSearches.data].map(
              (item, index) => (
                <div key={index} className={styles.sliderMenuItem}>
                  <Button
                    icon={<FaFireFlameSimple />}
                    onClick={() => handleTagClick(item)}
                  >
                    {item}
                  </Button>
                </div>
              )
            )
          : //Render placeholders while loading
            Array.from({ length: 30 }).map((item, index) => (
              <div key={index} className={styles.sliderMenuItem}>
                <div className={styles.placeholder}>
                  <Button>Loading...</Button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TrendingSearchesSlider;
