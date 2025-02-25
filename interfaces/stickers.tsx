export interface Stickers {
  data: Sticker[];
}

export interface Sticker {
  id: string;
  title: string;
  images: {
    original: {
      url: string;
    };
  };
  user: {
    display_name: string;
    avatar_url: string;
  };
}
