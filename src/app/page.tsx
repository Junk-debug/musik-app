"use client";

import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import Player from "@/components/player/player";
import { useState } from "react";
import getSongs from "./songs";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SongsLibrary from "@/components/songs-library";

const Logo = () => (
  <h1 className="text-2xl font-gilroy font-extrabold">Musik app</h1>
);

const songs = getSongs();

export default function Home() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  const [isPlaying, setIsPlaying] = useState(false);

  const playNext = () => {
    setCurrentSongIndex((currSongIndex) => {
      const nextSongIndex = currSongIndex + 1;
      return nextSongIndex >= songs.length ? 0 : nextSongIndex;
    });
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentSongIndex((currSongIndex) => {
      const prevSongIndex = currSongIndex - 1;
      return prevSongIndex < 0 ? songs.length - 1 : prevSongIndex;
    });
    setIsPlaying(true);
  };

  const playSong = (songIndex: number) => {
    setCurrentSongIndex(songIndex);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen px-4 py-8 mx-auto max-w-4xl flex flex-col">
      <header className="flex items-center justify-between">
        <Logo />

        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Music size={20} className="mr-1" /> Bibliothek
            </Button>
          </SheetTrigger>
          <SongsLibrary
            songs={songs}
            currentSongIndex={currentSongIndex}
            isPlaying={isPlaying}
            playSong={playSong}
          />
        </Sheet>
      </header>
      <main className="flex-grow flex flex-col justify-center">
        <Player
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onNext={playNext}
          onPrev={playPrev}
          currentSong={currentSong}
        />
      </main>
      <footer>footer</footer>
    </div>
  );
}
