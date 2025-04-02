import { Gif } from "@/interfaces/gifs";
import { Sticker } from "@/interfaces/stickers";

export interface Collection {
  id: string;
  name: string;
  gifs: Gif[];
  stickers: Sticker[];
}
