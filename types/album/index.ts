import { IArtist } from "../artist";

export type IAlbum = {
  encodeId: string,
  title: string,
  alias: string,
  isOffical: boolean,
  username: string,
  artistsNames: string,
  artists: IArtist[],
  isWorldWide: boolean,
  thumbnailM: string,
  link: string,
  thumbnail: string,
  duration: number,
  zingChoice: boolean,
  isPrivate: boolean,
  preRelease: boolean,
  releaseDate: number,
  genreIds: string[],
  album: IAlbum,
  PR: boolean,
  indicators: [],
  isIndie: boolean,
  streamingStatus: number,
  allowAudioAds: boolean;
}