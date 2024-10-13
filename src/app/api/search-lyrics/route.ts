import { NextResponse } from "next/server";

const baseUrl = process.env.GENIUS_API_URL || "";
const accessToken = process.env.GENIUS_API_ACCESS_TOKEN || "";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${baseUrl}/search?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return NextResponse.json({
      hits: data.response.hits,
    });
  } catch (error) {
    console.error("Error fetching song:", error);
    return NextResponse.json(
      { error: "Error fetching text: " },
      { status: 500 }
    );
  }
}
