//Types
import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";
import { Collection } from "../../types/collection";
//Icons
import { IoIosRemoveCircle } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";

export const generateCollectionButton = (
  collection: Collection,
  media: Gif | Sticker
) => {
  if (media && media.type === "gif") {
    const isGifInCollection = collection.gifs.some(
      (gif) => gif.id === media.id
    );

    return isGifInCollection ? <IoIosRemoveCircle /> : <IoIosAddCircle />;
  }
  if (media && media.type === "sticker") {
    const isStickerInCollection = collection.stickers.some(
      (sticker) => sticker.id === media.id
    );

    return isStickerInCollection ? <IoIosRemoveCircle /> : <IoIosAddCircle />;
  }
};
