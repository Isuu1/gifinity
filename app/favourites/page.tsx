"use client";
import { useState } from "react";

//Components
import FavouritesFeed from "@/components/FavouritesFeed/FavouritesFeed";
import NotificationMessage from "@/components/NotificationMessage/NotificationMessage";
import MediaTypeMenu from "@/components/MediaTypeMenu/MediaTypeMenu";
import Button from "@/components/UI/Button";
import Modal from "@/components/Modal/Modal";
import ConfirmDelete from "@/components/ConfirmDelete/ConfirmDelete";
import PageHeadline from "@/components/PageHeadline/PageHeadline";

//Context
import { useStorage } from "@/context/StorageContext";

//Icons
import { IoTrashBin } from "react-icons/io5";

//Animations
import { AnimatePresence } from "framer-motion";

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
      <PageHeadline title="Favourites" imageUrl="/images/heart.svg" />

      <AnimatePresence initial={false} mode="wait">
        {showModal && (
          <Modal key="modal">
            <ConfirmDelete
              onConfirm={handleRemoveItems}
              onCancel={() => setShowModal(false)}
            />
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
