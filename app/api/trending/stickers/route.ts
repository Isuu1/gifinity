import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = searchParams.get("offset") || 0;
  const limit = searchParams.get("limit") || 25;

  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
    }

    const url = `https://api.giphy.com/v1/stickers/trending?api_key=${apiKey}&offset=${offset}&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Giphy API returned ${response.status}: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Error fetching data, ${error}` },
      { status: 500 }
    );
  }
}
