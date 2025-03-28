import { Gif } from "./gifs";
import { Sticker } from "./stickers";

export interface Collection {
  id: string;
  name: string;
  items: {
    type: string;
    data: Gif[] | Sticker[];
  }[];
}
