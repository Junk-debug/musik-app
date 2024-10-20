import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const urlParam = searchParams.get("url");

  if (!urlParam) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const lyricsUrl = decodeURIComponent(urlParam);

  try {
    const response = await fetch(`${lyricsUrl}`);
    const html = await response.text();

    const $ = cheerio.load(html);

    const lyricsContainer = $('div[class^="Lyrics__Container"]');
    if (lyricsContainer.text() === "") {
      return NextResponse.json({ error: "No lyrics found" }, { status: 404 });
    }

    const lyrics = lyricsContainer
      .map((_, elem) => {
        const snippet = $(elem)
          .html()
          ?.replace(/<br\s*\/?>/g, "\n")
          .replace(/<\/?[^>]+(>|$)/g, "");
        return snippet?.trim();
      })
      .get()
      .join("\n\n");

    return NextResponse.json({
      lyrics: lyrics,
    });
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    return NextResponse.json(
      { error: "Error fetching lyrics" },
      { status: 500 }
    );
  }
}
