import { fetchSearchData } from "@/utils/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const searchQuery = searchParams.q || "";

  const results = await fetchSearchData(searchQuery);
  console.log(results);

  return (
    <div>
      <h1>Search for: {searchQuery}</h1>
      {results.data.map((result) => (
        <img key={result.id} src={result.images.original.url} />
      ))}
    </div>
  );
}
