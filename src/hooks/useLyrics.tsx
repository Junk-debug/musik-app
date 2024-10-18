import { useState, useEffect } from "react";

const targetLanguage = "pl";

type ApiError = {
  message: string;
  status: number;
};

function isError(error: unknown): error is ApiError {
  if (error instanceof Error) {
    return true;
  }

  if (error instanceof Object && "message" in error && "status" in error) {
    return true;
  }

  return false;
}

const fetchLyrics = async (lyricsLink: string): Promise<string> => {
  const response = await fetch(`/api/lyrics/${encodeURIComponent(lyricsLink)}`);
  const data = await response.json();
  return data.lyrics;
};

const translateLyrics = async (lyrics: string): Promise<string> => {
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
  return data.translatedText;
};

export default function useLyrics(lyricsLink: string) {
  const [translatedLyrics, setTranslatedLyrics] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);

  const [isLoadingLyrics, setIsLoadingLyrics] = useState(true);
  const [isLoadingTranslatedLyrics, setIsLoadingTranslatedLyrics] =
    useState(true);

  const [lyricsError, setLyricsError] = useState<ApiError | null>(null);
  const [translatedLyricsError, setTranslatedLyricsError] =
    useState<ApiError | null>(null);

  useEffect(() => {
    let ignore = false;

    const makeRequest = async () => {
      setIsLoadingLyrics(true);
      setIsLoadingTranslatedLyrics(true);
      try {
        const lyrics = await fetchLyrics(lyricsLink);

        if (!ignore) {
          setLyrics(lyrics);
        }

        if (lyrics) {
          try {
            const translatedLyrics = await translateLyrics(lyrics);

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
