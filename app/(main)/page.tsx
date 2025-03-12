//Utils
import { getTrendingGifs, getTrendingStickers } from "@/utils/api";

//Components
import SliderMenu from "@/components/SliderMenu/SliderMenu";
import DataFeed from "@/components/DataFeed/DataFeed";
import PageHeadline from "@/components/PageHeadline/PageHeadline";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

export default async function Home() {
  const trendingGifs: Gifs = await getTrendingGifs();
  const trendingStickers: Stickers = await getTrendingStickers();

  return (
    <div className="page">
      <PageHeadline title="Trending now" imageUrl="/images/trending4.svg" />

      <SliderMenu />
      <DataFeed
        data={{
          gifs: trendingGifs,
          stickers: trendingStickers,
        }}
      />
    </div>
  );
}
