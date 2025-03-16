"use client";
import { lazy, Suspense, useEffect, useState } from "react";

//Components
import SliderMenu from "@/components/SliderMenu/SliderMenu";
// Lazy load the DataFeed component
const DataFeed = lazy(() => import("@/components/DataFeed/DataFeed"));
import PageHeadline from "@/components/PageHeadline/PageHeadline";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";
import Loading from "@/components/Loading/Loading";

export default function Home() {
  const [trendingGifs, setTrendingGifs] = useState<Gifs | null>(null);
  const [trendingStickers, setTrendingStickers] = useState<Stickers | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const gifsResponse = await fetch("/api/trending-gifs");
        const gifsData = await gifsResponse.json();
        console.log(gifsData);
        setTrendingGifs(gifsData);

        const stickersResponse = await fetch("/api/trending-stickers");
        const stickersData = await stickersResponse.json();
        setTrendingStickers(stickersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <div className="page">
      <PageHeadline title="Trending now" imageUrl="/images/trending4.svg" />

      <SliderMenu />
      <Suspense fallback={<Loading />}>
        {trendingGifs && trendingStickers && (
          <DataFeed
            data={{
              gifs: trendingGifs,
              stickers: trendingStickers,
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
