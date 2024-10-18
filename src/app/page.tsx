"use client";

import getSongs from "./songs";
import Lyrics from "@/components/lyrics"; 

import Player from "@/components/player/player";
import SongsLibrary from "@/components/songs-library";
import Logo from "@/components/logo";
import useSongs from "@/hooks/useSongs";

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

  return (
    <div className="min-h-screen px-4 py-8 mx-auto max-w-4xl flex flex-col">
      <header className="flex items-center justify-between">
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
          currentSong={currentSong}
        />
      </main>

        <Lyrics lyricsLink={currentSong.lyrics} /> 

    </div>
  );
}
