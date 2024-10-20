import { useState, useEffect } from "react";

const targetLanguage = "pl";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const fetchLyrics = async (
  lyricsLink: string,
  signal?: AbortSignal
): Promise<string> => {
  const response = await fetch(
    `/api/lyrics?url=${encodeURIComponent(lyricsLink)}`,
    {
      signal,
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.lyrics;
};

const translate = async (
  lyrics: string,
  signal?: AbortSignal
): Promise<string> => {
  const response = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: lyrics,
      targetLang: targetLanguage,
    }),
    signal,
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
    const controller = new AbortController();
    const { signal } = controller;

    const makeRequest = async () => {
      setIsLoadingLyrics(true);
      setIsLoadingTranslatedLyrics(true);

      setLyricsError(null);
      setTranslatedLyricsError(null);

      try {
        const lyrics = await fetchLyrics(lyricsLink, signal);

        setLyrics(lyrics);

        if (!lyrics) {
          return;
        }

        try {
          const translatedLyrics = await translate(lyrics, signal);

          setTranslatedLyrics(translatedLyrics);
        } catch (error) {
          console.log(signal.aborted);
          if (signal.aborted) {
            console.log("translate request aborted: ", signal.reason);
            return;
          }

          console.error("Error translating lyrics:", error);

          if (isError(error)) {
            setTranslatedLyricsError(error);
          }
        } finally {
          if (signal.aborted) {
            return;
          }

          setIsLoadingTranslatedLyrics(false);
        }
      } catch (error) {
        if (signal.aborted) {
          console.log("lyrics request aborted: ", signal.reason);
          return;
        }

        console.error("Error fetching lyrics:", error);

        if (isError(error)) {
          setLyricsError(error);
        }
      } finally {
        if (signal.aborted) {
          return;
        }

        setIsLoadingLyrics(false);
        setIsLoadingTranslatedLyrics(false);
      }
    };

    if (lyricsLink) {
      makeRequest();
    }

    return () => {
      controller.abort("aborted because lyricsLink changed");
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
