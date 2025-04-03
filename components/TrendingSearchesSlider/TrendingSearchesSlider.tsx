"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Styles
import styles from "./TrendingSearchesSlider.module.scss";

//Components
import Button from "../UI/Button";

//Icons
import { FaFireFlameSimple } from "react-icons/fa6";
import Error from "../Error/Error";

interface TrendingSearches {
  data: string[];
}

const TrendingSearchesSlider: React.FC = () => {
  const [trendingSearches, setTrendingSearches] = useState<TrendingSearches>({
    data: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/trending?q=${tag}`);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await fetch("api/trending-searches");
        const response = await data.json();

        setTrendingSearches(response);
      } catch (error) {
        setError(error as string);
      } finally {
        // setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error) return <Error errorMessage={error} />;

  if (isLoading)
    return (
      <div className={styles.trendingSearchesContainer}>
        <div className={styles.trendingSearchesInnerWrapper}>
          {Array.from({ length: 30 }).map((item, index) => (
            <div key={index} className={styles.trendingSearchesMenuItem}>
              <div className={styles.placeholder}>
                <Button>Loading...</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className={styles.trendingSearchesContainer}>
      <div className={styles.trendingSearchesInnerWrapper}>
        {/* Render two sets of items for a seamless effect */}
        {trendingSearches.data &&
          [...trendingSearches.data, ...trendingSearches.data].map(
            (item, index) => (
              <div key={index} className={styles.trendingSearchesMenuItem}>
                <Button
                  icon={<FaFireFlameSimple />}
                  onClick={() => handleTagClick(item)}
                >
                  {item}
                </Button>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default TrendingSearchesSlider;
