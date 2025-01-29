import GifsFeed from "@/components/GifsFeed/GifsFeed";
import styles from "./page.module.scss";
import { getTrendingGifs } from "@/utils/utils";

export default async function Home() {
  const data = await getTrendingGifs();
  console.log("Gifs", data);

  return (
    <div className="page">
      <GifsFeed trendingGifs={data} />
    </div>
  );
}
