import { toastStyle } from "@/styles/toast";
import toast from "react-hot-toast";

async function fetchData(endpoint: string) {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/${endpoint}?api_key=${process.env.API_KEY}`
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.error(`Error fetching ${endpoint}`, error);
  }
}

export async function getTrendingGifs() {
  return fetchData("gifs/trending");
}

export async function getTrendingStickers() {
  return fetchData("stickers/trending");
}

export async function getTrendingSearches() {
  return fetchData("trending/searches");
}

async function fetchSearchData(searchQuery: string, type: string) {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/${type}/search?q=${searchQuery}&api_key=${process.env.API_KEY}`
    );
    const response = await data.json();
    console.log(response);
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

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard", toastStyle);
}
