import { useState, useEffect } from "react";

const targetLanguage = "pl";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const fetchLyrics = async (lyricsLink: string): Promise<string> => {
  const response = await fetch(`/api/lyrics/${encodeURIComponent(lyricsLink)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.lyrics;
};

const translate = async (lyrics: string): Promise<string> => {
  const response = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: lyrics,
      targetLang: targetLanguage,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.translatedText;
};

export default function useLyrics(lyricsLink: string) {
  const [translatedLyrics, setTranslatedLyrics] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);

  const [isLoadingLyrics, setIsLoadingLyrics] = useState(true);
  const [isLoadingTranslatedLyrics, setIsLoadingTranslatedLyrics] =
    useState(true);

  const [lyricsError, setLyricsError] = useState<Error | null>(null);
  const [translatedLyricsError, setTranslatedLyricsError] =
    useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;

    const makeRequest = async () => {
      setIsLoadingLyrics(true);
      setIsLoadingTranslatedLyrics(true);

      setLyricsError(null);
      setTranslatedLyricsError(null);

      try {
        const lyrics = await fetchLyrics(lyricsLink);

        if (!ignore) {
          console.log("set lyrics", lyrics.slice(0, lyrics.indexOf("\n")));
          setLyrics(lyrics);
        }

        if (lyrics) {
          try {
            const translatedLyrics = await translate(lyrics);

            if (!ignore) {
              setTranslatedLyrics(translatedLyrics);
            }
          } catch (error) {
            console.error("Error translating lyrics:", error);

            if (isError(error)) {
              setTranslatedLyricsError(error);
            }
          } finally {
            setIsLoadingTranslatedLyrics(false);
          }
        }
      } catch (error) {
        console.error("Error fetching lyrics:", error);

        if (isError(error)) {
          setLyricsError(error);
        }
      } finally {
        setIsLoadingLyrics(false);
        setIsLoadingTranslatedLyrics(false);
      }
    };

    if (lyricsLink) {
      makeRequest();
    }

    return () => {
      ignore = true;
    };
  }, [lyricsLink]);

  return {
    translatedLyrics,
    lyrics,
    isLoadingLyrics,
    isLoadingTranslatedLyrics,
    lyricsError,
    translatedLyricsError,
  };
}
