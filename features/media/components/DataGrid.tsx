"use client";

import React, { useEffect, useState } from "react";

//Styles
import styles from "./DataGrid.module.scss";
//Components
import MediaTypeMenu from "./MediaTypeMenu";
import MediaCard from "./MediaCard";
//Interfaces
import { Gifs } from "@/shared/interfaces/gifs";
import { Stickers } from "@/shared/interfaces/stickers";

//import LoadMoreDataOnScroll from "../LoadMoreDataOnScroll/LoadMoreDataOnScroll";

interface DataGridProps {
  data: {
    gifs: Gifs;
    stickers: Stickers;
  };
}

const DataGrid: React.FC<DataGridProps> = ({ data }) => {
  const { gifs, stickers } = data;

  const [displayedContent, setDisplayedContent] = useState<Gifs | Stickers>(
    gifs
  );

  const [activeButton, setActiveButton] = useState<string>("gifs");

  useEffect(() => {
    // Ensure it updates when props change
    setDisplayedContent(activeButton === "gifs" ? gifs : stickers);
  }, [gifs, stickers, activeButton]);

  return (
    <div>
      <MediaTypeMenu
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
      {/* <LoadMoreDataOnScroll
        displayedContent={displayedContent}
        setDisplayedContent={setDisplayedContent}
        activeButton={activeButton}
      > */}
      <div className={styles.feedContainer}>
        {displayedContent &&
          displayedContent.data.map((media) => (
            <MediaCard media={media} key={media.id} />
          ))}
      </div>
      {/* </LoadMoreDataOnScroll> */}
    </div>
  );
};

export default DataGrid;
