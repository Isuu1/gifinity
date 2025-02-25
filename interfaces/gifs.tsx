export interface Gifs {
  data: Gif[];
}

export interface Gif {
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
