import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import SongCard from "@/components/song-card";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Song } from "@/app/songs";

type Props = {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  onSongClick: (index: number, isCurrent: boolean) => void;
};

export default function SongsLibrary({
  songs,
  currentSongIndex,
  isPlaying,
  onSongClick,
}: Props) {
  return (
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
              isCurrentPlaying={isPlaying && isCurrent}
              isCurrent={isCurrent}
              key={song.id}
              song={song}
              onClick={() => onSongClick(i, isCurrent)}
            />
          );
        })}
      </div>
    </SheetContent>
  );
}
