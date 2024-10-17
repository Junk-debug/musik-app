import { useEffect, useState } from "react";

export default function Lyrics({ lyricsLink }: { lyricsLink: string }) {
  const [translatedLyrics, setTranslatedLyrics] = useState(null);
  const [lyrics, setLyrics] = useState(null);

    const fetchLyrics = async () => {
        try {
          const response = await fetch(`/api/lyrics/${encodeURIComponent(lyricsLink)}`);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
    
          const data = await response.json();
          if(data.lyrics){
          setLyrics(data.lyrics);
          await translateLyrics(data.lyrics);
        } 
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
  
      if (data.translatedText) {
        setTranslatedLyrics(data.translatedText);
      } 
    } catch (error) {
      console.error("Error translating lyrics:", error);
    }
  };

  useEffect(() => {
    if (lyricsLink) {
      fetchLyrics();
    }
  }, [lyricsLink]);

  return (
        <div>
          <h1>Lyrics Viewer</h1>
          {lyrics ? (
            <div>
              <h2>Original Lyrics</h2>
              <p>{lyrics}</p>
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
