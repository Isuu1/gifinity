import FavouritesFeed from "@/components/FavouritesFeed/FavouritesFeed";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  const userFavouriteGifs = data.user?.user_metadata.favouriteGifs;
  const userFavouriteStickers = data.user?.user_metadata.favouriteStickers;

  console.log("Favourite gifs server", userFavouriteGifs);
  console.log("Favourite stickers server", userFavouriteStickers);

  if (error) {
    return <h2>There was an error loading user data.</h2>;
  }

  return (
    <div>
      <h1>Favourites</h1>
      <FavouritesFeed
        data={{
          gifs: userFavouriteGifs,
          stickers: userFavouriteStickers,
        }}
      />
    </div>
  );
}
