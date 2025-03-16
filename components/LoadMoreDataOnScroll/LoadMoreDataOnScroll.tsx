"use client";

import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";
import { getTrendingGifs } from "@/utils/api";
import { fetchTrendingMediaData } from "@/utils/api";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface IProps {
  displayedContent: Gifs | Stickers | undefined;
  setDisplayedContent: React.Dispatch<
    React.SetStateAction<Gifs | Stickers | undefined>
  >;
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
    // const response = await getTrendingGifs(offset, limit);
    // const response = await fetchTrendingMediaData("gifs/trending", 50, limit);

    if (!response || !response.data || response.data.length === 0) {
      setHasMore(false); // No more data to load
      return;
    }

    const newContent = response.data;
    setOffset((prevOffset) => {
      console.log("Offset being set to:", prevOffset + limit); // Debugging: Check new offset
      return prevOffset + limit;
    });
    setTimeout(() => {
      setDisplayedContent({
        ...displayedContent,
        data: [...displayedContent.data, ...newContent],
      });
    }, 2000);
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
