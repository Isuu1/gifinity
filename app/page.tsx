import GifsFeed from "@/components/GifsFeed/GifsFeed";
import styles from "./page.module.scss";
import {
  getTrendingGifs,
  getTrendingSearches,
  getTrendingStickers,
} from "@/utils/utils";

export default async function Home() {
  const trendingGifs = await getTrendingGifs();
  const trendingStickers = await getTrendingStickers();
  const trendingSearches = await getTrendingSearches();

  return (
    <div className="page">
      <GifsFeed
        trendingGifs={trendingGifs}
        trendingStickers={trendingStickers}
        trendingSearches={trendingSearches}
      />
    </div>
  );
}
