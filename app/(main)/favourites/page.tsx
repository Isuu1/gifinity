"use client";

//Components
import FavouritesGrid from "@/features/favourites/components/FavouritesGrid";
import NotificationMessage from "@/features/favourites/components/NotificationMessage";
import PageHeadline from "@/components/PageHeadline/PageHeadline";

//Context
import { useStorage } from "@/context/StorageContext";

export default function Page() {
  const { localFavouriteGifs, localFavouriteStickers } = useStorage();

  return (
    <div className="page">
      <PageHeadline title="Favourites" imageUrl="/images/heart.svg" />

      <NotificationMessage>
        Your favorites are currently stored in your browser`s local storage.
        Creating an account will allow you to save them permanently allowing you
        to access them on any device.
      </NotificationMessage>

      <FavouritesGrid
        data={{ gifs: localFavouriteGifs, stickers: localFavouriteStickers }}
      />
    </div>
  );
}
