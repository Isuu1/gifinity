"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//Components
import DataFeed from "@/components/DataFeed/DataFeed";
import Loading from "@/components/Loading/Loading";
import SliderMenu from "@/components/SliderMenu/SliderMenu";
import PageHeadline from "@/components/PageHeadline/PageHeadline";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

//Utils
import { fetchTrendingByTag } from "@/utils/client";

export default function Page() {
  const [gifs, setGifs] = useState<Gifs | null>(null);
  const [stickers, setStickers] = useState<Stickers | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      const gifs = await fetchTrendingByTag(searchQuery, "gifs");
      const stickers = await fetchTrendingByTag(searchQuery, "stickers");

      if (gifs.error || stickers.error) setError(gifs.error || stickers.error);

      if (gifs.data) setGifs(gifs.data);
      if (stickers.data) setStickers(stickers.data);

      setIsLoading(false);
    }
    fetchData();
  }, [searchQuery]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="page">
      <PageHeadline
        title={`Trending for: ${searchQuery}`}
        imageUrl="/images/trending4.svg"
      />

      <SliderMenu />

      {error !== null && <p>{error}</p>}
      {gifs !== null && stickers !== null && (
        <DataFeed data={{ gifs: gifs, stickers: stickers }} />
      )}
    </div>
  );
}
