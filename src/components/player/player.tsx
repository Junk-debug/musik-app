"use client";

import { forwardRef } from "react";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "./player.css";

import { MicVocal } from "lucide-react";
import Image from "next/image";

import { audioSrcTargetUrl, Song } from "@/app/songs";
import { customIcons } from "./icons";

const fallbackImage =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW11c2ljLTIiPjxjaXJjbGUgY3g9IjgiIGN5PSIxOCIgcj0iNCIvPjxwYXRoIGQ9Ik0xMiAxOFYybDcgNCIvPjwvc3ZnPg==";

type Props = {
  currentSong: Song;
  onNext: () => void;
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
  onLyricsClick: () => void;
};

const Player = forwardRef<AudioPlayer, Props>(
  ({ currentSong, onNext, onPrev, onPlay, onPause, onLyricsClick }, ref) => {
    const { cover, title, artist, audio } = currentSong;
    const audioSrc = audioSrcTargetUrl + audio;

    return (
      <div className="flex flex-col items-center">
        <Image
          src={cover || fallbackImage}
          alt={title}
          width={300}
          height={300}
          priority
          className="mb-8"
        />
        <h3 className="flex flex-col gap-2 items-center mb-2">
          <span className="text-4xl font-gilroy font-bold">{title}</span>
          <span className="font-gilroy text-muted-foreground">{artist}</span>
        </h3>
        <AudioPlayer
          ref={ref}
          volume={0.7}
          className="max-w-lg"
          defaultDuration={null}
          src={audioSrc}
          onPlay={onPlay}
          onPause={onPause}
          onClickNext={onNext}
          onClickPrevious={onPrev}
          onEnded={onNext}
          showJumpControls={false}
          showSkipControls
          showDownloadProgress
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
          ]}
          customControlsSection={[
            RHAP_UI.LOOP,
            RHAP_UI.MAIN_CONTROLS,
            <button
              onClick={onLyricsClick}
              className="text-muted-foreground"
              key={"vocal-button"}
            >
              <MicVocal />
            </button>,
          ]}
          customIcons={customIcons}
          showFilledVolume
        />
      </div>
    );
  }
);

Player.displayName = "Player";

export default Player;
