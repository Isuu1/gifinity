"use client";
import Image from "next/image";

//Components
import FavouritesFeed from "@/components/FavouritesFeed/FavouritesFeed";

//Context
import { useStorage } from "@/context/StorageContext";

export default function Page() {
  const { localFavouriteGifs, localFavouriteStickers } = useStorage();

  return (
    <div className="page">
      <div className="headline-container">
        <Image src="/images/heart.svg" alt="trending" width={40} height={40} />
        <h2 className="headline-container__text">Favourites</h2>
      </div>

      <FavouritesFeed
        data={{ gifs: localFavouriteGifs, stickers: localFavouriteStickers }}
      />
    </div>
  );
}
