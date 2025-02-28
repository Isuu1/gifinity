"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

//Styles
import styles from "./DataFeed.module.scss";

//Animations
import { AnimatePresence } from "framer-motion";

//Components
import Button from "../UI/Button";
import MediaOverlay from "../MediaOverlay/MediaOverlay";

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

  useEffect(() => {
    // Ensure it updates when props change
    setDisplayedContent(activeButton === "gifs" ? gifs : stickers);
  }, [gifs, stickers, activeButton]);

  return (
    <div>
      <div className={styles.submenuContainer}>
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
      <div className={styles.feedContainer}>
        {displayedContent &&
          displayedContent.data.map((media) => (
            <div
              key={media.id}
              className={styles.gif}
              onMouseEnter={() => setShowOverlay(media.id)}
              onMouseLeave={() => setShowOverlay(null)}
            >
              <AnimatePresence initial={false}>
                {showOverlay === media.id && (
                  <MediaOverlay key={media.id} media={media} />
                )}
              </AnimatePresence>
              <Image
                className={styles.image}
                src={media.images.original.url}
                alt={media.title}
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
