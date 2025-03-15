async function fetchTrendingMediaData(endpoint: string) {
  try {
    // Use server environment detection
    const isServer = typeof window === "undefined";

    // Choose appropriate API key based on environment
    const apiKey = isServer
      ? process.env.API_KEY
      : process.env.NEXT_PUBLIC_API_KEY;

    const data = await fetch(
      `https://api.giphy.com/v1/${endpoint}?api_key=${apiKey}`,
      { next: { revalidate: 0 } }
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.error(`Error fetching ${endpoint}`, error);
  }
}

export async function getTrendingGifs() {
  return fetchTrendingMediaData("gifs/trending");
}

export async function getTrendingStickers() {
  return fetchTrendingMediaData("stickers/trending");
}

async function fetchSearchData(searchQuery: string, type: string) {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/${type}/search?q=${searchQuery}&api_key=${process.env.API_KEY}`,
      { cache: "no-store" }
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.error("Error fetching gifs", error);
  }
}

export async function getSearchedGifs(searchQuery: string) {
  return fetchSearchData(searchQuery, "gifs");
}

export async function getSearchedStickers(searchQuery: string) {
  return fetchSearchData(searchQuery, "stickers");
}
