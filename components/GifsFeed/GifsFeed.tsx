import Image from "next/image";
import React from "react";
import styles from "./GifsFeed.module.scss";

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
    }[];
  };
}

const GifsFeed = ({ trendingGifs }: IProps) => {
  console.log(trendingGifs);
  return (
    <div>
      <h2 className={styles.title}>Trending gifs</h2>
      <div className={styles.feedContainer}>
        {trendingGifs.data.map((gif) => (
          <div key={gif.id} className={styles.gif}>
            <Image
              className={styles.image}
              src={gif.images.original.url}
              alt={gif.title}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GifsFeed;
