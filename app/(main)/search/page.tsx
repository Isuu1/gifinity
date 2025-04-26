"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//Components
import DataFeed from "@/features/media/components/DataGrid";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import PageHeadline from "@/components/PageHeadline/PageHeadline";

//Interfaces
import { Gifs } from "@/shared/interfaces/gifs";
import { Stickers } from "@/shared/interfaces/stickers";

export default function Page() {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("q") || "";

  const [searchedGifs, setSearchedGifs] = useState<Gifs | null>(null);
  const [searchedStickers, setSearchedStickers] = useState<Stickers | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const gifsResponse = await fetch(`/api/search/gifs?q=${searchQuery}`);

        if (!gifsResponse.ok) {
          setError("Failed to fetch data.");
        }

        const gifsData: Gifs = await gifsResponse.json();
        setSearchedGifs(gifsData);

        const stickersResponse = await fetch(
          `/api/search/stickers?q=${searchQuery}`
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
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="page">
        <PageHeadline
          title={`Search results for: ${searchQuery}`}
          imageUrl="/images/search.svg"
        />
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <PageHeadline
          title={`Search results for: ${searchQuery}`}
          imageUrl="/images/search.svg"
        />

        <Error errorMessage={error} />
      </div>
    );
  }

  return (
    <div className="page">
      <PageHeadline
        title={`Search results for: ${searchQuery}`}
        imageUrl="/images/search.svg"
      />

      {searchedGifs?.data && searchedStickers?.data && (
        <DataFeed data={{ gifs: searchedGifs, stickers: searchedStickers }} />
      )}
    </div>
  );
}
