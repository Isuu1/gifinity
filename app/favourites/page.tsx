"use client";
import Image from "next/image";
import { useState } from "react";

//Components
import FavouritesFeed from "@/components/FavouritesFeed/FavouritesFeed";
import NotificationMessage from "@/components/NotificationMessage/NotificationMessage";
import MediaTypeMenu from "@/components/MediaTypeMenu/MediaTypeMenu";
import Button from "@/components/UI/Button";
import Modal from "@/components/Modal/Modal";

//Context
import { useStorage } from "@/context/StorageContext";

//Icons
import { IoTrashBin } from "react-icons/io5";

//Animations
import { AnimatePresence } from "motion/react";

export default function Page() {
  const {
    localFavouriteGifs,
    localFavouriteStickers,
    removeFavouritesFromLocalStorage,
  } = useStorage();

  const [activeButton, setActiveButton] = useState<string>("gifs");

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleRemoveItems = () => {
    removeFavouritesFromLocalStorage();
    setShowModal(false);
  };

  return (
    <div className="page">
      <div className="headline-container">
        <Image src="/images/heart.svg" alt="trending" width={40} height={40} />
        <h2 className="headline-container__text">Favourites</h2>
      </div>

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

      <FavouritesFeed
        data={{ gifs: localFavouriteGifs, stickers: localFavouriteStickers }}
        activeButton={activeButton}
      />
    </div>
  );
}
