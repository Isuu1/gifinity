import React from "react";
//Components
import Button from "../../../shared/components/UI/Button";
//Styles
import styles from "./MediaTypeMenu.module.scss";
//Animations
import { motion } from "framer-motion";

interface IProps {
  activeButton: string;
  setActiveButton: (type: string) => void;
}

const MediaTypeMenu: React.FC<IProps> = ({ activeButton, setActiveButton }) => {
  return (
    <div className={styles.mediaTypeMenu}>
      <div className={styles.buttonsContainer}>
        <motion.div
          className={styles.indicator}
          animate={{ x: activeButton === "gifs" ? 0 : "100%" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        ></motion.div>
        <Button
          className={styles.button}
          // active={activeButton === "gifs" && true}
          onClick={() => setActiveButton("gifs")}
        >
          Gifs
        </Button>
        <Button
          className={styles.button}
          // active={activeButton === "stickers" && true}
          onClick={() => setActiveButton("stickers")}
        >
          Stickers
        </Button>
      </div>
    </div>
  );
};

export default MediaTypeMenu;
