"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//Components
import DataFeed from "@/components/DataFeed/DataFeed";
import Loading from "@/components/Loading/Loading";
import PageHeadline from "@/components/PageHeadline/PageHeadline";
import Error from "@/components/Error/Error";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

export default function Page() {
  const [searchedGifs, setSearchedGifs] = useState<Gifs | null>(null);
  const [searchedStickers, setSearchedStickers] = useState<Stickers | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const category = decodeURIComponent(searchParams.get("q") || "");

  useEffect(() => {
    async function fetchData() {
      try {
        const gifsResponse = await fetch(`/api/search/gifs?q=${category}`);

        const gifsData: Gifs = await gifsResponse.json();
        setSearchedGifs(gifsData);

        const stickersResponse = await fetch(
          `/api/search/stickers?q=${category}`
        );

        const stickersData: Stickers = await stickersResponse.json();
        setSearchedStickers(stickersData);
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
  }, [category]);

  if (isLoading) {
    return <Loading />;
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
      <PageHeadline
        title={`Results for category: ${category}`}
        imageUrl="/images/category.svg"
      />

      {searchedGifs?.data && searchedStickers?.data && (
        <DataFeed data={{ gifs: searchedGifs, stickers: searchedStickers }} />
      )}
    </div>
  );
}
