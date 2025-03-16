// export async function fetchTrendingMediaData(
//   endpoint: string,
//   offset: number = 0,
//   limit: number = 25
// ) {
//   try {
//     // Use server environment detection
//     const isServer = typeof window === "undefined";

//     // Choose appropriate API key based on environment
//     const apiKey = isServer
//       ? process.env.API_KEY
//       : process.env.NEXT_PUBLIC_API_KEY;

//     const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&offset=${offset}&limit=${limit}`;

//     console.log("Fetching URL:", url); // Debugging: Check the URL

//     const data = await fetch(url, {
//       next: { revalidate: 0 },
//       headers: {
//         "Cache-Control": "no-cache",
//       },
//     });
//     const response = await data.json();
//     return response;
//   } catch (error) {
//     console.error(`Error fetching ${endpoint}`, error);
//   }
// }

// export async function getTrendingGifs(offset: number = 0, limit: number = 25) {
//   console.log(offset, limit);
//   return fetchTrendingMediaData("gifs/trending", offset, limit);
// }

// export async function getTrendingStickers() {
//   return fetchTrendingMediaData("stickers/trending");
// }

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
