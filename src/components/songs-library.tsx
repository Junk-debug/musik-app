import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import SongCard from "@/components/song-card";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Song } from "@/app/songs";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  onSongClick: (index: number) => void;
};

export default function SongsLibrary({
  songs,
  currentSongIndex,
  isPlaying,
  onSongClick,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Music size={20} className="mr-1" /> Bibliothek
        </Button>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="mb-4 px-6">
          <SheetTitle className="!text-2xl !font-gilroy !font-extrabold">
            Bibliothek
          </SheetTitle>
          <VisuallyHidden asChild>
            <SheetDescription>Liederbibliothek</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        <div className="flex flex-col">
          {songs.map((song, i) => {
            const isCurrent = i === currentSongIndex;
            return (
              <SongCard
                isCurrentSongPlaying={isPlaying && isCurrent}
                isSongCurrent={isCurrent}
                key={song.id}
                song={song}
                onClick={() => onSongClick(i)}
              />
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
