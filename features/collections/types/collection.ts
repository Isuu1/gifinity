import { Gif } from "@/shared/interfaces/gifs";
import { Sticker } from "@/shared/interfaces/stickers";

export interface Collection {
  id: string;
  name: string;
  gifs: Gif[];
  stickers: Sticker[];
}
