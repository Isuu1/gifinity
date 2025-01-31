"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./GifsFeed.module.scss";
import { AnimatePresence } from "framer-motion";

//Components
import Button from "../UI/Button";
import GifOverlay from "../GifOverlay/GifOverlay";

interface IProps {
  trendingGifs: {
    data: {
      id: string;
      title: string;
      images: {
        original: {
          url: string;
        };
      };
      user: {
        display_name: string;
        avatar_url: string;
      };
    }[];
  };
  trendingStickers: {
    data: {
      id: string;
      title: string;
      images: {
        original: {
          url: string;
        };
      };
      user: {
        display_name: string;
        avatar_url: string;
      };
    }[];
  };
}

const GifsFeed = ({ trendingGifs, trendingStickers }: IProps) => {
  const [showOverlay, setShowOverlay] = useState<string | null>(null);
  const [displayedContent, setDisplayedContent] = useState(trendingGifs);
  const [activeButton, setActiveButton] = useState("gifs");

  const changeContent = (content: string) => {
    setActiveButton(content);
    if (content === "gifs") {
      setDisplayedContent(trendingGifs);
    } else {
      setDisplayedContent(trendingStickers);
    }
  };

  return (
    <div>
      <div className="headline-container">
        <Image
          src="/images/trending4.svg"
          alt="trending"
          width={40}
          height={40}
        />
        <h2 className="headline-container__text">Trending now</h2>
      </div>
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
        {displayedContent.data.map((gif) => (
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

export default GifsFeed;
