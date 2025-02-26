import Image from "next/image";

//Utils
import { getTrendingGifs, getTrendingStickers } from "@/utils/utils";

//Components
import SliderMenu from "@/components/SliderMenu/SliderMenu";
import DataFeed from "@/components/DataFeed/DataFeed";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

export default async function Home() {
  const trendingGifs: Gifs = await getTrendingGifs();
  const trendingStickers: Stickers = await getTrendingStickers();

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
