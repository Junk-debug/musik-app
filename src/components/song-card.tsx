import { Song } from "@/app/songs";
import Image from "next/image";
import Equalizer from "@/components/ui/equalizer";
import { HTMLAttributes } from "react";

type Props = {
  song: Song;
  isCurrent?: boolean;
  isCurrentPlaying?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function SongCard({
  song,
  isCurrent,
  isCurrentPlaying,
  className,
  ...props
}: Props) {
  return (
    <div
      className={`${
        className || ""
      } flex gap-4 px-6 py-4 bg-card hover:bg-muted`}
      {...props}
    >
      <Image src={song.cover} alt={song.title} width={80} height={80} />
      <div className="flex flex-col justify-center">
        <span className="font-gilroy text-xl font-bold">{song.title}</span>
        <span className="text-muted-foreground">{song.artist}</span>
      </div>

      {isCurrent && (
        <Equalizer
          className={`self-center ml-auto ${
            isCurrentPlaying || "[&>rect]:animate-none"
          }`}
        />
      )}
    </div>
  );
}
