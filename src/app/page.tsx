"use client";

import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import Player from "@/components/player/player";
import { useState } from "react";
import getSongs from "./songs";
import Lyrics from "@/components/lyrics"; 

const Logo = () => (
  <h1 className="text-2xl font-gilroy font-extrabold">Musik app</h1>
);

export default function Home() {
  const [songs] = useState(getSongs());
  const [currentSong, setCurrentSong] = useState(songs[0]);

  return (
    <div className="min-h-screen px-4 py-8 mx-auto max-w-4xl flex flex-col">
      <header className="flex items-center justify-between">
        <Logo />
        <Button>
          <Music size={20} className="mr-1" /> Bibliothek
        </Button>
      </header>
      <main className="flex-grow flex flex-col justify-center">
        <Player
          onNext={() => {
            console.log(currentSong);
            setCurrentSong(songs[songs.indexOf(currentSong) + 1] || songs[0]);
          }}
          onPrev={() =>
            setCurrentSong(
              songs[songs.indexOf(currentSong) - 1] || songs[songs.length - 1]
            )
          }
          currentSong={currentSong}
        />
      </main>

        <Lyrics lyricsLink={currentSong.lyrics} /> 

    </div>
  );
}
