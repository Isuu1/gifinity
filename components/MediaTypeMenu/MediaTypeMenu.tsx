import React from "react";
//Components
import Button from "../UI/Button";
//Styles
import styles from "./MediaTypeMenu.module.scss";

interface IProps {
  activeButton: string;
  setActiveButton: (type: string) => void;
}

const MediaTypeMenu: React.FC<IProps> = ({ activeButton, setActiveButton }) => {
  return (
    <div className={styles.mediaTypeMenu}>
      <Button
        active={activeButton === "gifs" && true}
        onClick={() => setActiveButton("gifs")}
      >
        Gifs
      </Button>
      <Button
        active={activeButton === "stickers" && true}
        onClick={() => setActiveButton("stickers")}
      >
        Stickers
      </Button>
    </div>
  );
};

export default MediaTypeMenu;
