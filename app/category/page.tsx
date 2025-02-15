"use client";

import DataFeed from "@/components/DataFeed/DataFeed";
import { getSearchedGifs, getSearchedStickers } from "@/utils/utils";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // const searchQueryParam =
  //   (await searchParams.then((params) => params.q)) || "";
  // const searchQuery = Array.isArray(searchQueryParam)
  //   ? searchQueryParam[0]
  //   : searchQueryParam;

  // console.log("searchParams", searchParams);

  // const gifs = await getSearchedGifs(searchQuery);
  // const stickers = await getSearchedStickers(searchQuery);

  console.log("Search params", searchParams);

  return (
    <div className="page">
      <div className="headline-container">
        <h2 className="headline-container__text">
          {/* Gifs from category: {searchQuery} */}
        </h2>
      </div>
      {/* <DataFeed data={{ gifs: gifs, stickers: stickers }} /> */}
    </div>
  );
}
