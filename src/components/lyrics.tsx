import { useEffect, useState } from "react";

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
  const [requestMade, setRequestMade] = useState(false);

  useEffect(() => {

    const makeRequest = async () => {
      const lyrics = await fetchLyrics(lyricsLink);
      setLyrics(lyrics);
      setIsLoadingLyrics(false);

      if (lyrics) {
        const translatedLyrics = await translateLyrics(lyrics);
        setTranslatedLyrics(translatedLyrics);
        setIsLoadingTranslatedLyrics(false);
      }
    };

    if (lyricsLink) {
      makeRequest();
      setRequestMade(true);
    }
  }, [lyricsLink, requestMade]);

  return (
    <div>
      <h2>Lyrics Viewer</h2>
      {isLoadingLyrics ? (
        <p>Loading lyrics...</p>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <h2>Original Lyrics</h2>
            <pre>{lyrics}</pre> 
          </div>
          <div>
            <h2>Translated Lyrics (Polish)</h2>
            {isLoadingTranslatedLyrics ? (
              <p>Loading translation...</p>
            ) : (
              <pre>{translatedLyrics}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
