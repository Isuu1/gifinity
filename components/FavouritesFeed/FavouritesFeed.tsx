import React, { useEffect, useState } from "react";
import Image from "next/image";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

//Components
import Button from "../UI/Button";
import MediaOverlay from "../MediaOverlay/MediaOverlay";

//Styles
import styles from "./FavouritesFeed.module.scss";

//Animations
import { AnimatePresence } from "motion/react";

//Icons
import { IoTrashBin } from "react-icons/io5";

interface IProps {
  data: {
    gifs?: Gifs;
    stickers?: Stickers;
  };
}

const FavouritesFeed: React.FC<IProps> = ({ data }) => {
  const { gifs, stickers } = data;

  const [showOverlay, setShowOverlay] = useState<string | null>(null);

  const [activeButton, setActiveButton] = useState<string>("gifs");

  const [displayedContent, setDisplayedContent] = useState<
    Gifs | Stickers | undefined
  >(gifs);

  const isFavouritesEmpty = !displayedContent?.data.length;

  useEffect(() => {
    // Ensure it updates when props change
    setDisplayedContent(activeButton === "gifs" ? gifs : stickers);
  }, [gifs, stickers, activeButton]);

  return (
    <div>
      <div className={styles.notification}>
        <h4>
          Your favorites are currently stored in your browser`s local storage.
          Creating an account will allow you to save them permanently allowing
          you to access them on any device.
        </h4>
      </div>
      <div className="flex-row">
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
        <div className={styles.clearButton}>
          <Button icon={<IoTrashBin />} iconPosition="right">
            Clear favourites
          </Button>
        </div>
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
      {isFavouritesEmpty && (
        <div className={styles.emptyFavourites}>
          <h3>You don`t have any favourite {activeButton} yet!</h3>
        </div>
      )}
    </div>
  );
};

export default FavouritesFeed;
