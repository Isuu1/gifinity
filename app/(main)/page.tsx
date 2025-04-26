"use client";

import { useEffect, useState } from "react";

//Components
import TrendingSearchesSlider from "@/shared/components/TrendingSearchesSlider/TrendingSearchesSlider";
import DataFeed from "@/features/media/components/DataGrid";
import PageHeadline from "@/shared/components/PageHeadline/PageHeadline";
import Loading from "@/shared/components/Loading/Loading";
import Error from "@/shared/components/Error/Error";
//Interfaces
import { Gifs } from "@/shared/interfaces/gifs";
import { Stickers } from "@/shared/interfaces/stickers";

export default function Home() {
  const [trendingGifs, setTrendingGifs] = useState<Gifs | null>(null);
  const [trendingStickers, setTrendingStickers] = useState<Stickers | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const gifsResponse = await fetch("/api/trending/gifs");

        const gifsData: Gifs = await gifsResponse.json();
        setTrendingGifs(gifsData);

        const stickersResponse = await fetch("/api/trending/stickers");

        const stickersData: Stickers = await stickersResponse.json();
        setTrendingStickers(stickersData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError((error as Error).message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="page">
        <PageHeadline title="Trending now" imageUrl="/images/trending4.svg" />
        <TrendingSearchesSlider />
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <PageHeadline title="Trending now" imageUrl="/images/trending4.svg" />

        <Error errorMessage={error} />
      </div>
    );
  }

  return (
    <div className="page">
      <PageHeadline title="Trending now" imageUrl="/images/trending4.svg" />

      <TrendingSearchesSlider />

      {trendingGifs?.data && trendingStickers?.data && (
        <DataFeed
          data={{
            gifs: trendingGifs,
            stickers: trendingStickers,
          }}
        />
      )}
    </div>
  );
}
