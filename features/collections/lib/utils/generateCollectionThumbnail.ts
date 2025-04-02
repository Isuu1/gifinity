import { Collection } from "../../types/collection";

export const generateCollectionThumbnail = (collection: Collection) => {
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
