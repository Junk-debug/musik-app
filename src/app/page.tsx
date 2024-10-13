"use client";

import { useState } from "react";

const translate = async (text: string) => {
  console.log(text);

  const res = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, targetLang: "pl" }),
  });

  const data = await res.json();

  return data.translatedText;
};

const searchSong = async (search: string) => {
  const res = await fetch(`/api/search-lyrics?query=${search}`);
  const data = await res.json();
  return data.hits;
};

const getLyrics = async (url: string) => {
  const res = await fetch(`/api/lyrics/${url}`);
  const data = await res.json();
  return data.lyrics;
};

const searchLyrics = async (search: string) => {
  const searchRes = await searchSong(search);
  console.log(searchRes[0].result);
  const url = searchRes[0].result.url;
  const lyrics = await getLyrics(url);

  console.log(lyrics);

  const translatedLyrics = await translate(lyrics);

  return { lyrics, translatedLyrics };
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [lyrics, setLyrics] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold">Type song name</h1>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={async () => {
            const { lyrics, translatedLyrics } = await searchLyrics(search);
            setLyrics(lyrics + "\n\n\n\n\n" + translatedLyrics);
          }}
        >
          Search
        </button>
      </div>
      <pre>{lyrics}</pre>
    </div>
  );
}
