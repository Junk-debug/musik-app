import { Song } from "@/app/songs";
import { useState } from "react";

export default function useSongs(songs: Song[]) {
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

  return {
    currentSong,
    currentSongIndex,
    isPlaying,
    playNext,
    playPrev,
    playSong,
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
  };
}
