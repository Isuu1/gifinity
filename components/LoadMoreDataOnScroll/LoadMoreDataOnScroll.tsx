"use client";

import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface IProps {
  displayedContent: Gifs | Stickers;
  setDisplayedContent: React.Dispatch<React.SetStateAction<Gifs | Stickers>>;
  children: React.ReactNode;
  activeButton: string;
}

const LoadMoreDataOnScroll: React.FC<IProps> = ({
  children,
  displayedContent,
  setDisplayedContent,
  activeButton,
}) => {
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [offset, setOffset] = useState<number>(25);

  const limit = 25;

  const loadMoreData = async () => {
    const gifsResponse = await fetch(`/api/trending-gifs?offset=${offset}`);
    const stickersResponse = await fetch(
      `/api/trending-stickers?offset=${offset}`
    );

    const gifsData = await gifsResponse.json();
    const stickersData = await stickersResponse.json();

    if (!gifsResponse || !stickersResponse) {
      setHasMore(false); // No more data to load
      return;
    }

    console.log("Gifs response:", gifsResponse);

    console.log("Gifs response:", gifsData);
    console.log("Stickers response:", stickersData);

    const newGifs = gifsData.data;
    setOffset((prevOffset) => {
      console.log("Offset being set to:", prevOffset + limit); // Debugging: Check new offset
      return prevOffset + limit;
    });
    setTimeout(() => {
      setDisplayedContent({
        ...displayedContent,
        data: [...displayedContent.data, ...newGifs],
      });
    }, 2000);

    function checkForRepeatedIds(
      gifsData: Gifs | undefined,
      displayedContent: Gifs | Stickers | null
    ) {
      if (!gifsData?.data || !displayedContent?.data) {
        return; // Return early if data is missing
      }

      gifsData.data.forEach((media) => {
        if (displayedContent.data.some((m) => m.id === media.id)) {
          console.error("Repeated ID found:", media.id);
        }
      });
    }
    checkForRepeatedIds(gifsData, displayedContent);
  };

  return (
    <InfiniteScroll
      hasMore={hasMore}
      dataLength={displayedContent?.data?.length || 0}
      loader={<h2>Loading</h2>}
      next={loadMoreData}
    >
      {children}
    </InfiniteScroll>
  );
};

export default LoadMoreDataOnScroll;
