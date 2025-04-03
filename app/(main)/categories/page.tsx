"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//Components
import DataFeed from "@/features/media/components/DataGrid";
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const category = decodeURIComponent(searchParams.get("q") || "");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const gifsResponse = await fetch(`/api/search/gifs?q=${category}`);

        if (!gifsResponse.ok) {
          setError("Failed to fetch GIFs data.");
        }

        const gifsData: Gifs = await gifsResponse.json();
        setSearchedGifs(gifsData);

        const stickersResponse = await fetch(
          `/api/search/stickers?q=${category}`
        );

        if (!stickersResponse.ok) {
          setError("Failed to fetch Stickers data.");
        }

        const stickersData: Stickers = await stickersResponse.json();
        setSearchedStickers(stickersData);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [category]);

  if (isLoading) {
    return (
      <>
        <PageHeadline
          title={`Results for category: ${category}`}
          imageUrl="/images/category.svg"
        />
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeadline title="Trending now" imageUrl="/images/trending4.svg" />
        <Error errorMessage={error} />
      </div>
    );
  }

  return (
    <div>
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
