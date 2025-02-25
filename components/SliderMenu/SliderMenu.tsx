"use client";

import React from "react";

//Styles
import styles from "./SliderMenu.module.scss";

//Components
import Button from "../UI/Button";

//Icons
import { FaFireFlameSimple } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface IProps {
  items: {
    data: string[];
  };
}

const SliderMenu: React.FC<IProps> = ({ items }) => {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/trending?q=${tag}`);
  };

  return (
    <div className={styles.sliderMenuContainer}>
      <div className={styles.sliderMenuInnerWrapper}>
        {/* Render two sets of items for a seamless effect */}
        {[...items.data, ...items.data].map((item, index) => (
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
