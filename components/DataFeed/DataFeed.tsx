"use client";

import Image from "next/image";
import React, { useState } from "react";

//Styles
import styles from "./DataFeed.module.scss";

//Animations
import { AnimatePresence } from "framer-motion";

//Components
import Button from "../UI/Button";
import GifOverlay from "../GifOverlay/GifOverlay";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

interface IProps {
  data: {
    gifs?: Gifs;
    stickers?: Stickers;
  };
}

const DataFeed: React.FC<IProps> = ({ data }) => {
  const { gifs, stickers } = data;

  const [showOverlay, setShowOverlay] = useState<string | null>(null);

  const [displayedContent, setDisplayedContent] = useState<
    Gifs | Stickers | undefined
  >(gifs);

  const [activeButton, setActiveButton] = useState<string>("gifs");

  const changeContent = (content: string) => {
    setActiveButton(content);
    if (content === "gifs") {
      setDisplayedContent(gifs);
    } else {
      setDisplayedContent(stickers);
    }
  };

  return (
    <div>
      <div className={styles.submenuContainer}>
        <Button
          active={activeButton === "gifs" && true}
          onClick={() => changeContent("gifs")}
        >
          Gifs
        </Button>
        <Button
          active={activeButton === "stickers" && true}
          onClick={() => changeContent("stickers")}
        >
          Stickers
        </Button>
      </div>
      <div className={styles.feedContainer}>
        {displayedContent &&
          displayedContent.data.map((gif) => (
            <div
              key={gif.id}
              className={styles.gif}
              onMouseEnter={() => setShowOverlay(gif.id)}
              onMouseLeave={() => setShowOverlay(null)}
            >
              <AnimatePresence initial={false}>
                {showOverlay === gif.id && (
                  <GifOverlay key={gif.id} gifUrl={gif.images.original.url} />
                )}
              </AnimatePresence>
              <Image
                className={styles.image}
                src={gif.images.original.url}
                alt={gif.title}
                fill
                unoptimized
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DataFeed;
