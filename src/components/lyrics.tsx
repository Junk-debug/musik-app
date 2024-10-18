import { useEffect, useState } from "react";
import Loader from "./ui/loader";

const fetchLyrics = async (lyricsLink: string) => {
  try {
    const response = await fetch(
      `/api/lyrics/${encodeURIComponent(lyricsLink)}`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data.lyrics;
  } catch (error) {
    console.error("Error fetching lyrics:", error);
  }
};

const translateLyrics = async (lyrics: string) => {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: lyrics,
        targetLang: "pl",
      }),
    });

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("Error translating lyrics:", error);
  }
};

export default function Lyrics({ lyricsLink }: { lyricsLink: string }) {
  const [translatedLyrics, setTranslatedLyrics] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(true);
  const [isLoadingTranslatedLyrics, setIsLoadingTranslatedLyrics] = useState(true);

  useEffect(() => {
    let ignore = false; 

    const makeRequest = async () => {
      try {
        const lyrics = await fetchLyrics(lyricsLink);
        if (!ignore) {
          setLyrics(lyrics);
          setIsLoadingLyrics(false);
        }

        if (lyrics) {
          const translatedLyrics = await translateLyrics(lyrics);
          if (!ignore) {
            setTranslatedLyrics(translatedLyrics);
            setIsLoadingTranslatedLyrics(false);
          }
        }
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      }
    };

    if (lyricsLink) {
      makeRequest();
    }

    return () => {
      ignore = true; 
    };
  }, [lyricsLink]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl text-center text-gray-700 mb-8">Lyrics Viewer</h1>

      {isLoadingLyrics ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="lyrics-section">
            <h2 className="text-2xl mb-4">Original Lyrics</h2>
            <pre className="bg-gray-100 p-4 rounded shadow-md text-gray-800 whitespace-pre-wrap">{lyrics}</pre>
          </div>

          <div className="lyrics-section">
            <h2 className="text-2xl mb-4">Translated Lyrics (Polish)</h2>
            {isLoadingTranslatedLyrics ? (
              <Loader />
            ) : (
              <pre className="bg-gray-100 p-4 rounded shadow-md text-gray-800 whitespace-pre-wrap">{translatedLyrics}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
