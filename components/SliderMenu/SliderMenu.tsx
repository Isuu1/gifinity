"use client";

import React from "react";

//Styles
import styles from "./SliderMenu.module.scss";

//Components
import Button from "../UI/Button";

//Icons
import { FaFireFlameSimple } from "react-icons/fa6";

interface IProps {
  items: {
    data: string[];
  };
}

const SliderMenu: React.FC<IProps> = ({ items }) => {
  return (
    <div className={styles.sliderMenuContainer}>
      <div className={styles.sliderMenuInnerWrapper}>
        {/* Render two sets of items for a seamless effect */}
        {[...items.data, ...items.data].map((item, index) => (
          <div key={index} className={styles.sliderMenuItem}>
            <Button icon={<FaFireFlameSimple />}>{item}</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderMenu;
