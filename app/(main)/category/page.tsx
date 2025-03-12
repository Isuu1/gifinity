"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//Components
import DataFeed from "@/components/DataFeed/DataFeed";
import Loading from "@/components/Loading/Loading";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

//Utils
import { fetchCategoryData } from "@/utils/client";
import PageHeadline from "@/components/PageHeadline/PageHeadline";

export default function Page() {
  const [gifs, setGifs] = useState<Gifs | null>(null);
  const [stickers, setStickers] = useState<Stickers | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const category = decodeURIComponent(searchParams.get("q") || "");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      const gifs = await fetchCategoryData(category, "gifs");
      const stickers = await fetchCategoryData(category, "stickers");

      if (gifs.error || stickers.error) {
        setError(gifs.error || stickers.error);
      }

      if (gifs.data) setGifs(gifs.data);
      if (stickers.data) setStickers(stickers.data);

      setIsLoading(false);
    }
    fetchData();
  }, [category]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="page">
      <PageHeadline
        title={`Results for category: ${category}`}
        imageUrl="/images/category.svg"
      />
      {error !== null && <p>{error}</p>}
      {gifs !== null && stickers !== null && (
        <DataFeed data={{ gifs: gifs, stickers: stickers }} />
      )}
    </div>
  );
}
