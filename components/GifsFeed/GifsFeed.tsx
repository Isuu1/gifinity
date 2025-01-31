"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./GifsFeed.module.scss";
import GifOverlay from "../GifOverlay/GifOverlay";
import { AnimatePresence } from "framer-motion";

//Icons
import { FaArrowUpShortWide } from "react-icons/fa6";

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
      <div className="headline-container">
        {/* <FaArrowUpShortWide className="headline-container__icon" /> */}
        <Image
          src="/images/trending3.svg"
          alt="trending"
          width={40}
          height={40}
        />
        <h2 className="headline-container__text">Trending now</h2>
      </div>
      <div className={styles.feedContainer}>
        {trendingGifs.data.map((gif) => (
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
