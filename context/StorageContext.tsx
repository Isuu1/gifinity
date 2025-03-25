"use client";

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

//Toast notifications
import toast from "react-hot-toast";
import { toastStyle } from "@/styles/toast";

//Interfaces
import { Gif, Gifs } from "@/interfaces/gifs";
import { Sticker, Stickers } from "@/interfaces/stickers";

interface StorageContextType {
  localFavouriteGifs: Gifs;
  localFavouriteStickers: Stickers;
  addItemToLocalStorage: (item: Gif | Sticker) => void;
  removeFavouritesFromLocalStorage: () => void;
}

export const StorageContext = createContext<StorageContextType | null>(null);

export const StorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [localFavouriteGifs, setLocalFavouriteGifs] = useState<Gifs>({
    data: [],
  });
  const [localFavouriteStickers, setLocalFavouriteStickers] =
    useState<Stickers>({ data: [] });

  //When the component mounts, check if there are any gifs or stickers in local storage and set them to state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localGifs = localStorage.getItem("userGifs");
      const localStickers = localStorage.getItem("userStickers");
      setLocalFavouriteGifs(localGifs ? JSON.parse(localGifs) : { data: [] });
      setLocalFavouriteStickers(
        localStickers ? JSON.parse(localStickers) : { data: [] }
      );
    }
  }, []);

  //When the localFavouriteGifs or localFavouriteStickers state changes, update the local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userGifs", JSON.stringify(localFavouriteGifs));
    }
  }, [localFavouriteGifs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "userStickers",
        JSON.stringify(localFavouriteStickers)
      );
    }
  }, [localFavouriteStickers]);

  const addItemToLocalStorage = (item: Gif | Sticker) => {
    if (item.type === "gif") {
      setLocalFavouriteGifs((prev) => {
        const isItemInFavourites = prev.data.some((gif) => gif.id === item.id);
        const updatedFavourites = isItemInFavourites
          ? prev.data.filter((gif) => gif.id !== item.id)
          : [...prev.data, item];

        return {
          data: updatedFavourites,
        };
      });
      toast.success(
        localFavouriteGifs.data.some((gif) => gif.id === item.id)
          ? "Gif removed from favourites"
          : "Gif added to favourites",
        toastStyle
      );
    } else if (item.type === "sticker") {
      setLocalFavouriteStickers((prev) => {
        const isItemInFavourites = prev.data.some(
          (sticker) => sticker.id === item.id
        );
        const updatedFavourites = isItemInFavourites
          ? prev.data.filter((sticker) => sticker.id !== item.id)
          : [...prev.data, item];

        return {
          data: updatedFavourites,
        };
      });
      toast.success(
        localFavouriteStickers.data.some((sticker) => sticker.id === item.id)
          ? "Sticker removed from favourites"
          : "Sticker added to favourites",
        toastStyle
      );
    }
  };

  const removeFavouritesFromLocalStorage = () => {
    localStorage.removeItem("userGifs");
    localStorage.removeItem("userStickers");
    setLocalFavouriteGifs({ data: [] });
    setLocalFavouriteStickers({ data: [] });
  };

  return (
    <StorageContext.Provider
      value={{
        localFavouriteGifs,
        localFavouriteStickers,
        addItemToLocalStorage,
        removeFavouritesFromLocalStorage,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
};
