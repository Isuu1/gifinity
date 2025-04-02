"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

//Styles
import styles from "./DataGrid.module.scss";

//Animations
import { AnimatePresence } from "framer-motion";

//Components
import MediaOverlay from "./MediaOverlay";
import MediaTypeMenu from "./MediaTypeMenu";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";
import { useCollections } from "@/context/CollectionsProvider";
//import LoadMoreDataOnScroll from "../LoadMoreDataOnScroll/LoadMoreDataOnScroll";

interface IProps {
  data: {
    gifs: Gifs;
    stickers: Stickers;
  };
}

const DataGrid: React.FC<IProps> = ({ data }) => {
  const { gifs, stickers } = data;

  const [showOverlay, setShowOverlay] = useState<string | null>(null);

  const [displayedContent, setDisplayedContent] = useState<Gifs | Stickers>(
    gifs
  );

  const [activeButton, setActiveButton] = useState<string>("gifs");

  const { setMedia } = useCollections();

  useEffect(() => {
    // Ensure it updates when props change
    setDisplayedContent(activeButton === "gifs" ? gifs : stickers);
  }, [gifs, stickers, activeButton]);

  // console.log("displayed content", displayedContent);

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
            <div
              key={media.id}
              className={styles.gif}
              onMouseEnter={() => {
                setShowOverlay(media.id);
                setMedia(media);
              }}
              onMouseLeave={() => {
                setShowOverlay(null);
                //setMedia(null);
              }}
            >
              <AnimatePresence initial={false}>
                {showOverlay === media.id && <MediaOverlay key={media.id} />}
              </AnimatePresence>
              <Image
                className={styles.image}
                src={media.images.original.url}
                alt={media.title}
                fill
                unoptimized
              />
            </div>
          ))}
      </div>
      {/* </LoadMoreDataOnScroll> */}
    </div>
  );
};

export default DataGrid;
