import { useState } from "react";
import { getLyrics, searchSong } from "./api/lyricsApi";

const translate = async (text: string) => {
  const baseUrl = import.meta.env.VITE_TRANSLATE_SERVER_URL;

  const res = await fetch(`${baseUrl}/api/translate`, {
    method: "POST",
    body: JSON.stringify({
      text,
      targetLang: "pl",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  console.log(data);

  return data;
};

const searchLyrics = async (search: string) => {
  const searchRes = await searchSong(search);
  console.log(searchRes[0].result);
  const url = searchRes[0].result.url;
  const lyrics = (await getLyrics(url)) as string;
  console.log(lyrics);

  const translatedLyrics = await translate(lyrics);

  return [lyrics, translatedLyrics];
};

export default function App() {
  const [search, setSearch] = useState<string>("");
  const [lyrics, setLyrics] = useState<string | null>(null);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Type song name</h1>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={async () => {
            const [lyrics, translated] = await searchLyrics(search);
            setLyrics(lyrics + "\n\n" + translated);
          }}
        >
          Search
        </button>
      </div>
      <pre>{lyrics}</pre>
    </>
  );
}
