"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//Styles
import styles from "./SliderMenu.module.scss";

//Components
import Button from "../UI/Button";

//Icons
import { FaFireFlameSimple } from "react-icons/fa6";

interface TrendingTags {
  data: string[];
}

const SliderMenu: React.FC = () => {
  const [items, setItems] = useState<TrendingTags | null>(null);

  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/trending?q=${tag}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `https://api.giphy.com/v1/trending/searches?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const response = await data.json();
        setItems(response);
        return response;
      } catch (error) {
        console.error("Error fetching gifs", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.sliderMenuContainer}>
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
