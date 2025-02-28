"use client";
import Image from "next/image";

//Components
import DataFeed from "@/components/DataFeed/DataFeed";

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
      <div
        style={{
          background: "#a0153e",
          padding: "1rem",
          borderRadius: "24px",
          color: "#fff",
          margin: "1rem auto",
        }}
      >
        <h4>
          Your favorites are currently stored in your browser`s local storage.
          Creating an account will allow you to save them permanently allowing
          you to access then on any device.
        </h4>
      </div>
      {localFavouriteGifs.data.length > 0 ||
      localFavouriteStickers.data.length > 0 ? (
        <DataFeed
          data={{ gifs: localFavouriteGifs, stickers: localFavouriteStickers }}
        />
      ) : (
        <h2 style={{ textAlign: "center" }}>
          You don`t have any favourites yet!
        </h2>
      )}
    </div>
  );
}
