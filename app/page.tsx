import GifsFeed from "@/components/GifsFeed/GifsFeed";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <GifsFeed />
    </div>
  );
}
