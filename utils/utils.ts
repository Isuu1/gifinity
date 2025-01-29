export async function getTrendingGifs() {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}`
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.error("Error fetching gifs", error);
  }
}
