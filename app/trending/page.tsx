"use client";

//Components
import DataFeed from "@/components/DataFeed/DataFeed";
import Loading from "@/components/Loading/Loading";
import SliderMenu from "@/components/SliderMenu/SliderMenu";

//Utils
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [gifs, setGifs] = useState(null);
  const [stickers, setStickers] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  async function fetchSearchData(searchQuery: string, type: string) {
    try {
      const data = await fetch(
        `https://api.giphy.com/v1/${type}/search?q=${searchQuery}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
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
        const gifs = await fetchSearchData(searchQuery, "gifs");
        const stickers = await fetchSearchData(searchQuery, "stickers");
        setGifs(gifs);
        setStickers(stickers);
      } catch (error) {
        console.error("Error fetching gifs", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchQuery]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="page">
      <div className="headline-container">
        <h2 className="headline-container__text">
          Trending for: {searchQuery}
        </h2>
      </div>
      <SliderMenu />
      {error !== null && <p>{error}</p>}
      {gifs !== null && stickers !== null && (
        <DataFeed data={{ gifs: gifs, stickers: stickers }} />
      )}
    </div>
  );
}
