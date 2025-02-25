"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//Components
import DataFeed from "@/components/DataFeed/DataFeed";
import Loading from "@/components/Loading/Loading";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

export default function Page() {
  const [gifs, setGifs] = useState<Gifs | null>(null);
  const [stickers, setStickers] = useState<Stickers | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const category = searchParams.get("q") || "";

  async function fetchCategory(categoryName: string, type: string) {
    try {
      const data = await fetch(
        `https://api.giphy.com/v1/${type}/search?q=${categoryName}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const response = await data.json();
      return response;
    } catch (error) {
      setError(`Error fetching gifs: ${error}`);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const gifs = await fetchCategory(category, "gifs");
        const stickers = await fetchCategory(category, "stickers");
        setGifs(gifs);
        setStickers(stickers);
      } catch (error) {
        console.error("Error fetching gifs", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [category]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="page">
      <div className="headline-container">
        <h2 className="headline-container__text">
          Gifs from category: {category}
        </h2>
      </div>
      {error !== null && <p>{error}</p>}
      {gifs !== null && stickers !== null && (
        <DataFeed data={{ gifs: gifs, stickers: stickers }} />
      )}
    </div>
  );
}
