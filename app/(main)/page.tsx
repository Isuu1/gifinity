"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

//Components
import TrendingSearchesSlider from "@/shared/components/TrendingSearchesSlider/TrendingSearchesSlider";
import PageHeadline from "@/shared/components/PageHeadline/PageHeadline";
import Loading from "@/shared/components/Loading/Loading";
import Error from "@/shared/components/Error/Error";
//Interfaces
import { Gifs } from "@/shared/interfaces/gifs";
import { Stickers } from "@/shared/interfaces/stickers";

//Dynamically import DataGrid component to prevent server-side rendering
const DataGrid = dynamic(() => import("@/features/media/components/DataGrid"), {
  loading: () => <Loading />,
  ssr: false, // Optional: Prevent this component from ever rendering on the server
});

export default function Home() {
  const [trendingGifs, setTrendingGifs] = useState<Gifs | null>(null);
  const [trendingStickers, setTrendingStickers] = useState<Stickers | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log("Home.tsx in (main)");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const gifsResponse = await fetch(`/api/trending/gifs?limit=25`);

        const gifsData: Gifs = await gifsResponse.json();
        setTrendingGifs(gifsData);

        const stickersResponse = await fetch(`/api/trending/stickers?limit=25`);

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
        <DataGrid
          data={{
            gifs: trendingGifs,
            stickers: trendingStickers,
          }}
        />
      )}
    </div>
  );
}
