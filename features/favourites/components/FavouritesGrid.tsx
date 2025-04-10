"use client";

import React, { useEffect, useState } from "react";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";
//Components
import MediaCard from "@/features/media/components/MediaCard";
import ConfirmDeleteFavourites from "./ConfirmDeleteFavourites";
import MediaTypeMenu from "@/features/media/components/MediaTypeMenu";
import Button from "@/components/UI/Button";
//Styles
import styles from "./FavouritesGrid.module.scss";
//Animations
import { AnimatePresence } from "framer-motion";
//Icons
import { IoTrashBin } from "react-icons/io5";

interface IProps {
  data: {
    gifs?: Gifs;
    stickers?: Stickers;
  };
}

const FavouritesGrid: React.FC<IProps> = ({ data }) => {
  const { gifs, stickers } = data;

  const [displayedContent, setDisplayedContent] = useState<Gifs | Stickers>(
    gifs || { data: [] }
  );

  const [activeButton, setActiveButton] = useState<string>("gifs");

  const [showModal, setShowModal] = useState<boolean>(false);

  //Check if the favourites are empty depending on currently displayed content
  const isFavouritesEmpty = displayedContent?.data.length === 0;

  useEffect(() => {
    // Ensure it updates when props change
    setDisplayedContent(
      activeButton === "gifs" ? gifs || { data: [] } : stickers || { data: [] }
    );
  }, [gifs, stickers, activeButton]);

  return (
    <div>
      <AnimatePresence>
        {showModal && (
          <ConfirmDeleteFavourites onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
      <div className="flex-row">
        <MediaTypeMenu
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
        <div className="margin-left-auto">
          <Button
            icon={<IoTrashBin />}
            iconPosition="right"
            onClick={() => setShowModal(true)}
          >
            Clear favourites
          </Button>
        </div>
      </div>
      <div className={styles.feedContainer}>
        {displayedContent.data.length > 0 &&
          displayedContent.data.map((media) => (
            <MediaCard media={media} key={media.id} />
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

export default FavouritesGrid;
