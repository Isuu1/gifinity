//Components
import DataFeed from "@/features/media/components/DataGrid";

import TrendingSearchesSlider from "@/components/TrendingSearchesSlider/TrendingSearchesSlider";
import PageHeadline from "@/components/PageHeadline/PageHeadline";

//Interfaces
import { Gifs } from "@/shared/interfaces/gifs";
import { Stickers } from "@/shared/interfaces/stickers";
import Error from "@/components/Error/Error";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchQueryParam =
    (await searchParams.then((params) => params.q)) || "";
  const searchQuery = Array.isArray(searchQueryParam)
    ? searchQueryParam[0]
    : searchQueryParam;

  try {
    const gifsResponse = await fetch(
      `${process.env.SITE_URL}/api/search/gifs?q=${searchQuery}`
    );
    const gifs: Gifs = await gifsResponse.json();
    const stickersResponse = await fetch(
      `${process.env.SITE_URL}/api/search/stickers?q=${searchQuery}`
    );
    const stickers: Stickers = await stickersResponse.json();

    return (
      <div className="page">
        <PageHeadline
          title={`Trending for: ${searchQuery}`}
          imageUrl="/images/trending4.svg"
        />

        <TrendingSearchesSlider />

        {gifs?.data && stickers?.data && (
          <DataFeed data={{ gifs: gifs, stickers: stickers }} />
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="page">
        <PageHeadline
          title={`Trending for: ${searchQuery}`}
          imageUrl="/images/trending4.svg"
        />
        <TrendingSearchesSlider />
        <Error errorMessage={error as string} />
      </div>
    );
  }
}
