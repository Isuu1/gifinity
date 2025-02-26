//Components
import DataFeed from "@/components/DataFeed/DataFeed";

//Utils
import { getSearchedGifs, getSearchedStickers } from "@/utils/api";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchQueryParam =
    (await searchParams.then((params) => params.q)) || "";
  const searchQuery = Array.isArray(searchQueryParam)
    ? searchQueryParam[0]
    : searchQueryParam;

  const gifs: Gifs = await getSearchedGifs(searchQuery);
  const stickers: Stickers = await getSearchedStickers(searchQuery);

  return (
    <div className="page">
      <div className="headline-container">
        <h2 className="headline-container__text">
          Search results for: {searchQuery}
        </h2>
      </div>
      <DataFeed data={{ gifs: gifs, stickers: stickers }} />
    </div>
  );
}
