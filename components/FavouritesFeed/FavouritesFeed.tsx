"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

//Components
import MediaOverlay from "../MediaOverlay/MediaOverlay";
import Modal from "../Modal/Modal";
import ConfirmDeleteFavourites from "../ConfirmDeleteFavourites/ConfirmDeleteFavourites";
import MediaTypeMenu from "../MediaTypeMenu/MediaTypeMenu";
import Button from "../UI/Button";

//Styles
import styles from "./FavouritesFeed.module.scss";

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

const FavouritesFeed: React.FC<IProps> = ({ data }) => {
  const { gifs, stickers } = data;

  const [showOverlay, setShowOverlay] = useState<string | null>(null);

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
      <AnimatePresence initial={false} mode="wait">
        {showModal && (
          <Modal key="modal" theme="light">
            <ConfirmDeleteFavourites onCancel={() => setShowModal(false)} />
          </Modal>
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
