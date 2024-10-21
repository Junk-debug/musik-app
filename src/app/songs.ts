import { v4 as uuid } from "uuid";

export type Song = {
  title: string;
  artist: string;
  lyrics: string;
  cover: string;
  audio: string;
  id: string;
};

export const audioSrcTargetUrl = "https://download.xn--41a.wiki/cache/";

const getData = (): Song[] => [
  {
    title: "Sonne",
    artist: "Rammstein",
    lyrics: "https://genius.com/Rammstein-sonne-lyrics",
    audio: "2/7db/371745469_456508979.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b27325d8b7c6feee0c8d6593d606",
    id: uuid(),
  },
  {
    title: "Deutschland",
    artist: "Rammstein",
    lyrics: "https://genius.com/Rammstein-deutschland-lyrics",
    audio: "4/f96/474499296_456358697.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b27302add2c77fb6999e311a3248",
    id: uuid(),
  },
  {
    title: "194 Länder",
    artist: "Mark Forster",
    lyrics: "https://genius.com/Mark-forster-194-lander-lyrics",
    audio: "3/b6b/320320773_456239648.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b2730f8403d3c21d596f2c98e5ff",
    id: uuid(),
  },
  {
    title: "Dynamit",
    artist: "Kollegah",
    lyrics: "https://genius.com/Kollegah-and-farid-bang-dynamit-lyrics",
    audio: "2/0f9/474499236_456738731.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b2734debd218fcb40c8a9b79fb8f",
    id: uuid(),
  },
  {
    title: "Einmal um die Welt",
    artist: "Cro",
    lyrics: "https://genius.com/Cro-einmal-um-die-welt-lyrics",
    audio: "2/91c/474499227_456437889.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b27397c097afa44e5cdb38a03d4f",
    id: uuid(),
  },
  {
    title: "Erfolg ist kein Glück",
    artist: "Kontra K",
    lyrics: "https://genius.com/Kontra-k-erfolg-ist-kein-gluck-lyrics",
    audio: "1/ba0/371745455_456315373.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e02596cfde8b0e1d0f597d75913",
    id: uuid(),
  },
  {
    title: "Hier kommt Alex",
    artist: "Die Toten Hosen",
    lyrics: "https://genius.com/Die-toten-hosen-hier-kommt-alex-lyrics",
    audio: "1/58a/371745442_456400657.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e02f023c090f8cc7d03238155b7",
    id: uuid(),
  },
  {
    title: "Rosen",
    artist: "Ellen Allien",
    // no lyrics
    lyrics: "https://genius.com/Ellen-allien-rosen-lyrics",
    audio: "1/191/474499327_456596681.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b2732e0c0daa39b44d3e6c9cff20",
    id: uuid(),
  },
  {
    title: "Atemlos durch die Nacht",
    artist: "Helene Fischer",
    lyrics: "https://genius.com/Helene-fischer-atemlos-durch-die-nacht-lyrics",
    audio: "4/019/371745442_456389179.mp3",
    cover: "https://i.scdn.co/image/ab67616d00001e02f20892c96efa6375c5fd1527",
    id: uuid(),
  },
];

export default getData;
