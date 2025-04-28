export interface Stickers {
  data: Sticker[];
  error?: string | null;
}

export interface Sticker {
  type: string;
  id: string;
  title: string;
  images: {
    original: {
      url: string;
      mp4: string;
    };
  };
  user: {
    display_name: string;
    avatar_url: string;
    username?: string;
  };
}
