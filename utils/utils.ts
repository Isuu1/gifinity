import { toastStyle } from "@/styles/toast";
import toast from "react-hot-toast";

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

export async function getTrendingStickers() {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/stickers/trending?api_key=${process.env.API_KEY}`
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.error("Error fetching gifs", error);
  }
}

export async function getTrendingSearches() {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/trending/searches?api_key=${process.env.API_KEY}`
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.error("Error fetching gifs", error);
  }
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard", toastStyle);
}
