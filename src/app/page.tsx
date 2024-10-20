"use client";

import getSongs from "./songs";
import Lyrics from "@/components/lyrics";

import Player from "@/components/player/player";
import SongsLibrary from "@/components/songs-library";
import Logo from "@/components/logo";
import useSongs from "@/hooks/useSongs";
import { useEffect, useRef, useState } from "react";

const songs = getSongs();

export default function Home() {
  const {
    currentSong,
    currentSongIndex,
    isPlaying,
    playNext,
    playPrev,
    playSong,
    onPause,
    onPlay,
  } = useSongs(songs);

  const [isShowLyrics, setIsShowLyrics] = useState(false);
  const lyricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShowLyrics && lyricsRef.current) {
      lyricsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isShowLyrics]);

  return (
    <div className="min-h-dvh px-4 py-4 md:py-8 mx-auto max-w-4xl flex flex-col">
      <header className="flex items-center justify-between mb-6">
        <Logo />

        <SongsLibrary
          songs={songs}
          onSongClick={(index) => {
            if (index !== currentSongIndex) {
              playSong(index);
            }
          }}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
        />
      </header>
      <main className="flex-grow flex flex-col justify-center">
        <Player
          onPlay={onPlay}
          onPause={onPause}
          onNext={playNext}
          onPrev={playPrev}
          onLyricsClick={() => setIsShowLyrics((prev) => !prev)}
          currentSong={currentSong}
        />

        {isShowLyrics && (
          <Lyrics
            className="mt-16"
            ref={lyricsRef}
            lyricsLink={currentSong.lyrics}
          />
        )}
      </main>
    </div>
  );
}
