import React from "react";
import Image from "next/image";

//Styles
import styles from "./LayoutBackground.module.scss";
//Interfaces
import { Gif } from "@/shared/interfaces/gifs";

const LayoutBackground: React.FC = async () => {
  const trendingGifsResponse = await fetch(
    `${process.env.SITE_URL}/api/trending/gifs`
  );

  const trendingGifs = await trendingGifsResponse.json();

  return (
    <div className={styles.background}>
      <div className={styles.blur}></div>
      <div className={styles.innerWrapper}>
        {trendingGifs &&
          trendingGifs.data.map((gif: Gif) => (
            <Image
              fill
              key={gif.id}
              src={gif.images.original.url}
              alt={gif.title}
              className={styles.gif}
              priority
            />
          ))}
      </div>
    </div>
  );
};

export default LayoutBackground;
