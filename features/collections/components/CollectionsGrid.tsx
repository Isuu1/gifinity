"use client";

import React from "react";
import Image from "next/image";

//Interfaces
// import { Gifs } from "@/interfaces/gifs";
// import { Stickers } from "@/interfaces/stickers";

//Components
// import MediaOverlay from "@/features/media/components/MediaOverlay";
// import MediaTypeMenu from "@/features/media/components/MediaTypeMenu";
// import Button from "@/components/UI/Button";

//Styles
import styles from "./CollectionsGrid.module.scss";

//Animations
import { AnimatePresence } from "framer-motion";

//Icons
import { MdDeleteForever } from "react-icons/md";

//import { IoTrashBin } from "react-icons/io5";
import { useCollections } from "@/context/CollectionsProvider";
import { Collection } from "@/interfaces/collections";
// import Button from "@/components/UI/Button";

const CollectionsGrid: React.FC = () => {
  //const [showOverlay, setShowOverlay] = useState<string | null>(null);

  // const [displayedContent, setDisplayedContent] = useState<
  //   Gifs | Stickers | null
  // >(null);

  // const [activeButton, setActiveButton] = useState<string>("gifs");

  // const [showModal, setShowModal] = useState<boolean>(false);

  // const { setMedia, collections } = useCollections();
  const { collections } = useCollections();

  //Check if the favourites are empty depending on currently displayed content
  //const isFavouritesEmpty = displayedContent?.data.length === 0;

  // useEffect(() => {
  //   // Ensure it updates when props change
  //   setDisplayedContent(
  //     activeButton === "gifs" ? gifs || { data: [] } : stickers || { data: [] }
  //   );
  // }, [gifs, stickers, activeButton]);
  console.log("collections", collections);

  const generateCollectionThumbnail = (collection: Collection) => {
    if (collection.gifs.length > 0) {
      const gifslength = collection.gifs.length;
      return collection.gifs[gifslength - 1].images.original.url;
    }
    if (collection.stickers.length > 0) {
      const stickersLength = collection.stickers.length;
      return collection.stickers[stickersLength - 1].images.original.url;
    }
    return "/images/avatar.gif"; // Fallback thumbnail
  };

  return (
    <div>
      <AnimatePresence>
        {/* {showModal && (
          <ConfirmDeleteFavourites onClose={() => setShowModal(false)} />
        )} */}
        <ul className={styles.collectionsMenu}>
          {collections.map((collection) => (
            <li className={styles.collectionItem} key={collection.id}>
              <div className={styles.deleteButton}>
                {/* <Button variant="light" icon={<MdDeleteForever />}>
                  Delete
                </Button> */}
                <MdDeleteForever />
              </div>
              <Image
                className={styles.image}
                src={generateCollectionThumbnail(collection)}
                alt="collection-thumbnail"
                fill
              />
              <h3>{collection.name}</h3>
              <div className={styles.data}>
                <h5>{collection.gifs.length} gifs</h5>
                <h5>{collection.stickers.length} stickers</h5>
              </div>
            </li>
          ))}
        </ul>
      </AnimatePresence>
      {/* <div className="flex-row">
        <MediaTypeMenu
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
        <div className="margin-left-auto">
          <Button
            icon={<IoTrashBin />}
            iconPosition="right"
            onClick={() => setShowModal(true)}
          >
            Clear favourites
          </Button>
        </div>
      </div> */}
      {/* <div className={styles.feedContainer}>
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
                setMedia(null);
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
      </div> */}
      {/* {isFavouritesEmpty && (
        <div className={styles.emptyFavourites}>
          <h3>You don`t have any favourite {activeButton} yet!</h3>
        </div>
      )} */}
    </div>
  );
};

export default CollectionsGrid;
