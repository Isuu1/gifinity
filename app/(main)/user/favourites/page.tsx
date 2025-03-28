"use client";

import FavouritesGrid from "@/features/favourites/components/FavouritesGrid";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const { favouriteGifs, favouriteStickers } = useAuth();

  return (
    <div>
      <h1>Favourites</h1>
      <FavouritesGrid
        data={{
          gifs: favouriteGifs,
          stickers: favouriteStickers,
        }}
      />
    </div>
  );
}
