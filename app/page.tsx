import GifsFeed from "@/components/GifsFeed/GifsFeed";
import styles from "./page.module.scss";
import { getTrendingGifs, getTrendingStickers } from "@/utils/utils";

export default async function Home() {
  const trendingGifs = await getTrendingGifs();
  const trendingStickers = await getTrendingStickers();

  return (
    <div className="page">
      <GifsFeed
        trendingGifs={trendingGifs}
        trendingStickers={trendingStickers}
      />
    </div>
  );
}
