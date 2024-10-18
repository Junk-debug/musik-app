import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

type Params = {
  url: string[];
};

export async function GET(_: Request, context: { params: Params }) {
  const lyricsUrl = decodeURIComponent(context.params.url.join("/"));
  console.log("lyrics url", lyricsUrl);

  try {
    const response = await fetch(`${lyricsUrl}`);
    const html = await response.text();

    const $ = cheerio.load(html);

    let lyrics = $("div.lyrics").text().trim();

    if (!lyrics) {
      lyrics = $('div[class^="Lyrics__Container"]')
        .map((_, elem) => {
          const snippet = $(elem)
            .html()
            ?.replace(/<br\s*\/?>/g, "\n")
            .replace(/<\/?[^>]+(>|$)/g, "");
          return snippet?.trim();
        })
        .get()
        .join("\n\n");
    }

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
