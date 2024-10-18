import useLyrics from "@/hooks/useLyrics";
import { Skeleton } from "@/components/ui/skeleton";
import { forwardRef } from "react";

const LyricsCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <pre className="bg-secondary font-gilroy shadow-lg p-4 rounded text-card-foreground whitespace-pre-wrap">
      {children}
    </pre>
  );
};

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-2xl mb-4 font-semibold">{children}</h3>;
};

type Props = {
  lyricsLink: string;
  className?: string;
};

const Lyrics = forwardRef<HTMLDivElement, Props>(
  ({ lyricsLink, className }, ref) => {
    const {
      isLoadingLyrics,
      isLoadingTranslatedLyrics,
      lyrics,
      translatedLyrics,
      lyricsError,
      translatedLyricsError,
    } = useLyrics(lyricsLink);

    return (
      <div
        ref={ref}
        className={`flex flex-col md:flex-row gap-8 ${className || ""}`}
      >
        <div className="basis-1/2">
          <Heading>Original Songtext</Heading>

          {isLoadingLyrics ? (
            <Skeleton className="h-[32rem]" />
          ) : (
            <LyricsCard>
              {lyricsError ? (
                <span className="text-red-500">{lyricsError.message}</span>
              ) : (
                lyrics
              )}
            </LyricsCard>
          )}
        </div>

        <div className="basis-1/2">
          <Heading>Übersetzter Liedtext (Polnisch)</Heading>

          {isLoadingTranslatedLyrics ? (
            <Skeleton className="h-[32rem]" />
          ) : (
            <LyricsCard>
              {translatedLyricsError ? (
                <span className="text-red-500">
                  {translatedLyricsError.message}
                </span>
              ) : (
                translatedLyrics
              )}
            </LyricsCard>
          )}
        </div>
      </div>
    );
  }
);

Lyrics.displayName = "Lyrics";

export default Lyrics;
