import { IAlbum } from "../album";
import { IArtist } from "../artist";
import { IGenre } from "../genre";

export type ISong = {
  encodeId: string;
  title: string;
  alias: string;
  isOffical: boolean;
  username: string;
  artistsNames: string;
  artists: IArtist;
  isWorldWide: boolean;
  thumbnailM: string;
  link: string;
  thumbnail: string;
  duration: number;
  zingChoice: boolean;
  isPrivate: boolean;
  preRelease: boolean;
  releaseDate: number;
  genreIds: IGenre[];
  album: IAlbum;
  indicators: [];
  isIndie: boolean;
  streamingStatus: number;
  allowAudioAds: boolean;
  hasLyric: boolean;
};