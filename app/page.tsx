import DataFeed from "@/components/DataFeed/DataFeed";
import {
  getTrendingGifs,
  getTrendingSearches,
  getTrendingStickers,
} from "@/utils/utils";
import Image from "next/image";
import SliderMenu from "@/components/SliderMenu/SliderMenu";

export default async function Home() {
  const trendingGifs = await getTrendingGifs();
  const trendingStickers = await getTrendingStickers();
  const trendingSearches = await getTrendingSearches();

  return (
    <div className="page">
      <div className="headline-container">
        <Image
          src="/images/trending4.svg"
          alt="trending"
          width={40}
          height={40}
        />
        <h2 className="headline-container__text">Trending now</h2>
      </div>
      <SliderMenu items={trendingSearches} />
      <DataFeed
        data={{
          gifs: trendingGifs,
          stickers: trendingStickers,
        }}
      />
    </div>
  );
}
