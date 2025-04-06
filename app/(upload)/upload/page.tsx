import Upload from "@/features/upload/components/Upload";

export default async function Page() {
  // const trendingGifsResponse = await fetch(
  //   `${process.env.NEXT_PUBLIC_SITE_URL}/api/trending/gifs`
  // );

  // const trendingGifs = await trendingGifsResponse.json();
  // console.log("trendingGifs", trendingGifs);

  return (
    <div className="page">
      <Upload />
    </div>
  );
}
