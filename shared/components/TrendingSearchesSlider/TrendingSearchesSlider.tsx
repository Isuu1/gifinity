"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";

//Styles
import styles from "./TrendingSearchesSlider.module.scss";
//Components
import Button from "../UI/Button";
import Error from "../Error/Error";
//Icons
import { FaFireFlameSimple } from "react-icons/fa6";

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

        if (!data.ok) {
          setError("There was an error fetching data.");
          return;
        }

        const response = await data.json();

        setTrendingSearches(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error)
    return (
      <div className={styles.trendingSearchesTicker}>
        <Error errorMessage={error} />
      </div>
    );

  if (isLoading)
    return (
      <div className={styles.placeholderContainer}>
        {Array.from({ length: 20 }).map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.placeholder}>
              <Button>Loading...</Button>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <Marquee
      pauseOnHover={true}
      speed={50}
      gradient={true}
      gradientColor="#1d1d1d"
      gradientWidth={50}
      className={styles.trendingSearchesTicker}
    >
      {trendingSearches.data.length > 0 &&
        trendingSearches.data.map((item, index) => (
          <div
            key={index}
            className={styles.item}
            onClick={() => handleTagClick(item)}
          >
            <Button icon={<FaFireFlameSimple />}>{item}</Button>
          </div>
        ))}
    </Marquee>
  );
};

export default TrendingSearchesSlider;
