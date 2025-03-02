import React, { useEffect, useState } from "react";
import Image from "next/image";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

//Components
import Button from "../UI/Button";
import MediaOverlay from "../MediaOverlay/MediaOverlay";
import NotificationMessage from "../NotificationMessage/NotificationMessage";
import Modal from "../Modal/Modal";

//Styles
import styles from "./FavouritesFeed.module.scss";

//Animations
import { AnimatePresence } from "motion/react";

//Icons
import { IoTrashBin } from "react-icons/io5";

//Context
import { useStorage } from "@/context/StorageContext";

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

  const [showModal, setShowModal] = useState<boolean>(false);

  const { removeFavouritesFromLocalStorage } = useStorage();

  const isFavouritesEmpty = !displayedContent?.data.length;

  const handleRemoveItems = () => {
    removeFavouritesFromLocalStorage();
    setShowModal(false);
  };

  useEffect(() => {
    // Ensure it updates when props change
    setDisplayedContent(activeButton === "gifs" ? gifs : stickers);
  }, [gifs, stickers, activeButton]);

  return (
    <div>
      <AnimatePresence initial={false}>
        {showModal && (
          <Modal key="modal">
            <h3>
              Are you sure you want to delete favourites gifs and stickers?
            </h3>
            <div className="flex-row">
              <Button active onClick={() => handleRemoveItems()}>
                Confirm
              </Button>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <NotificationMessage>
        Your favorites are currently stored in your browser`s local storage.
        Creating an account will allow you to save them permanently allowing you
        to access them on any device.
      </NotificationMessage>

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
