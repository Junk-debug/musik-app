import * as cheerio from "cheerio";

const baseUrl = import.meta.env.VITE_API_GENIUS_URL;
const accessToken = import.meta.env.VITE_API_GENIUS_ACCESS_TOKEN;
const proxyUrl = "https://api.allorigins.win/get?url=";

export const searchSong = async (songTitle: string) => {
  const query = encodeURIComponent(songTitle);

  try {
    const response = await fetch(
      `${baseUrl}/search?access_token=${accessToken}&q=${query}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch song data from Genius");
    }

    const data = await response.json();
    return data.response.hits;
  } catch (error) {
    console.error("Error fetching song:", error);
    return null;
  }
};

export const getSong = async (songId: number) => {
  try {
    const response = await fetch(
      `${baseUrl}/songs/${songId}?access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch song data from Genius");
    }

    const data = await response.json();
    return data.response.song;
  } catch (error) {
    console.error("Error fetching song:", error);
    return null;
  }
};

export const getLyrics = async (songUrl: string) => {
  try {
    const response = await fetch(`${proxyUrl}${songUrl}`);

    if (!response.ok) {
      throw new Error(`Ошибка при запросе: ${response.statusText}`);
    }

    const data = await response.json();

    const html = data.contents;
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

    return lyrics ? lyrics.trim() : null;
  } catch (error) {
    console.error("Error fetching lyrics:", error);
  }
};
