"use client";

import FavouritesFeed from "@/components/FavouritesFeed/FavouritesFeed";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const { favouriteGifs, favouriteStickers } = useAuth();

  return (
    <div>
      <h1>Favourites</h1>
      <FavouritesFeed
        data={{
          gifs: favouriteGifs,
          stickers: favouriteStickers,
        }}
      />
    </div>
  );
}
