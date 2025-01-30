"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./GifsFeed.module.scss";
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
}

const GifsFeed = ({ trendingGifs }: IProps) => {
  const [showOverlay, setShowOverlay] = useState<string | null>(null);

  return (
    <div>
      <h2 className={styles.title}>Trending gifs</h2>
      <div className={styles.feedContainer}>
        {trendingGifs.data.map((gif) => (
          <div
            key={gif.id}
            className={styles.gif}
            onMouseEnter={() => setShowOverlay(gif.id)}
            onMouseLeave={() => setShowOverlay(null)}
          >
            {showOverlay === gif.id && <GifOverlay />}
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
