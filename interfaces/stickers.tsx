export interface Stickers {
  data: Sticker[];
}

export interface Sticker {
  type: string;
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
