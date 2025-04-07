"use server";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file");
  const apiKey = process.env.API_KEY;

  if (!file) {
    return {
      success: false,
      data: null,
      error: "File is missing",
      status: 500,
    };
  }
  if (!apiKey) {
    return {
      success: false,
      data: null,
      error: "API key is missing",
      status: 500,
    };
  }
  const url = `https:/upload.giphy.com/v1/gifs?api_key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("errorData", errorData);
    throw new Error("Failed to upload file");
  }

  const data = await response.json();

  console.log("file", file);
  return {
    success: true,
    data: data,
    error: null,
    status: 200,
  };
}
