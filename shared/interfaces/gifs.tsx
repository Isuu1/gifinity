export interface Gifs {
  data: Gif[];
  error?: string | null;
}

export interface Gif {
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
