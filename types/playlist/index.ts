import { IAlbum } from "../album";

export type IPlaylist = {
  sectionType: string;
  viewType: string;
  title: string;
  link: string;
  sectionId: string;
  items: IAlbum[] | { song: IAlbum[] };
};