// "use client";
import { lazy, Suspense } from "react";

//Components
import SliderMenu from "@/components/SliderMenu/SliderMenu";
// Lazy load the DataFeed component
const DataFeed = lazy(() => import("@/components/DataFeed/DataFeed"));
import PageHeadline from "@/components/PageHeadline/PageHeadline";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default async function Home() {
  const trendingGifsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/trending/gifs`
  );
  const trendingGifs: Gifs = await trendingGifsResponse.json();
  const trendingStickersResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/trending/stickers`
  );
  const trendingStickers: Stickers = await trendingStickersResponse.json();

  return (
    <div className="page">
      <PageHeadline title="Trending now" imageUrl="/images/trending4.svg" />

      <SliderMenu />

      <Suspense fallback={<Loading />}>
        {trendingGifs?.data && trendingStickers?.data && (
          <DataFeed
            data={{
              gifs: trendingGifs,
              stickers: trendingStickers,
            }}
          />
        )}
      </Suspense>
      {trendingGifs?.error && <Error errorMessage={trendingGifs.error} />}
    </div>
  );
}
