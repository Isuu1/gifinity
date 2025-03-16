// export async function fetchCategories() {
//   try {
//     const response = await fetch(
//       `https://api.giphy.com/v1/gifs/categories?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return { data, error: null };
//   } catch (error) {
//     return { data: null, error: `Error fetching categories: ${error}` };
//   }
// }

export async function fetchCategoryData(categoryName: string, type: string) {
  const encodedSearchQuery = encodeURIComponent(categoryName);
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/${type}/search?q=${encodedSearchQuery}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return { data, error: null };
  } catch (error) {
    return { data: null, error: `Error fetching gifs: ${error}` };
  }
}

// export async function fetchTrendingByTag(searchQuery: string, type: string) {
//   try {
//     const response = await fetch(
//       `https://api.giphy.com/v1/${type}/search?q=${searchQuery}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     return { data, error: null };
//   } catch (error) {
//     return { data: null, error: `Error fetching gifs: ${error}` };
//   }
// }

// export async function fetchTrendingSearches() {
//   try {
//     const response = await fetch(
//       `https://api.giphy.com/v1/trending/searches?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     return { data, error: null };
//   } catch (error) {
//     return { data: null, error: `Error fetching trending searches: ${error}` };
//   }
// }
