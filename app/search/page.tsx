import DataFeed from "@/components/DataFeed/DataFeed";
import { getSearchedGifs, getSearchedStickers } from "@/utils/utils";

interface SearchPageProps {
  params: {};
  searchParams: {
    q?: string;
  };
}

export default async function Page({ searchParams }: SearchPageProps) {
  const searchQuery = (searchParams.q as string) || "";

  const gifs = await getSearchedGifs(searchQuery);
  const stickers = await getSearchedStickers(searchQuery);

  return (
    <div className="page">
      <div className="headline-container">
        <h2 className="headline-container__text">
          Search results for: {searchQuery}
        </h2>
      </div>
      <DataFeed data={{ gifs: gifs, stickers: stickers }} />
    </div>
  );
}
