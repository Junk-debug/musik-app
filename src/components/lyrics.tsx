import { useEffect, useState } from "react";

export default function Lyrics({ lyricsLink }: { lyricsLink: string }) {
  const [translatedLyrics, setTranslatedLyrics] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);

  const fetchLyrics = async () => {
    try {
      const response = await fetch(`/api/lyrics/${encodeURIComponent(lyricsLink)}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      setLyrics(data.lyrics);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    }
  };

  // Translate lyrics to Polish (doesnt work as intended yet)
  const translateLyrics = async (lyrics: string) => {
    try {
      const response = await fetch("/translate", {
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
      if (data.translatedText) {
        setTranslatedLyrics(data.translatedText);
      } else {
        setTranslatedLyrics("Translation not available.");
      }
    } catch (error) {
      console.error("Error translating lyrics:", error);
      setTranslatedLyrics("Failed to translate lyrics.");
    }
  };


  useEffect(() => {
    if (lyricsLink) {
      fetchLyrics();
    }
  }, [lyricsLink]);

  return (
    <div className="lyrics-container">
      <h1>Lyrics Viewer</h1>
      {lyrics ? (
        <div>
          <h2>Original Lyrics</h2>
          <p>{lyrics}</p>
          <button onClick={() => translateLyrics(lyrics)}>Translate to Polish</button>
        </div>
      ) : (
        <p>Loading lyrics...</p>
      )}

      {translatedLyrics && (
        <div>
          <h2>Translated Lyrics (Polish):</h2>
          <p>{translatedLyrics}</p>
        </div>
      )}
    </div>
  );
}
