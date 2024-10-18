import AudioPlayer from "react-h5-audio-player";
import {
  FastForward,
  Pause,
  Play,
  Repeat,
  Rewind,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

export const customIcons = {
  play: <Play className="w-full h-full" />,
  pause: <Pause className="w-full h-full" />,
  rewind: <Rewind className="w-full h-full" />,
  forward: <FastForward className="w-full h-full" />,
  next: <SkipForward className="w-full h-full" />,
  previous: <SkipBack className="w-full h-full" />,
  volumeMute: <VolumeX className="w-full h-full" />,
  volume: <Volume2 className="w-full h-full" />,
  loop: <Repeat className="w-full h-full text-primary" />,
  loopOff: <Repeat className="w-full h-full text-muted-foreground" />,
} satisfies AudioPlayer["props"]["customIcons"];
