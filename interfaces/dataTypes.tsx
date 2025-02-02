export interface IGifSticker {
  data: {
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
  }[];
}
