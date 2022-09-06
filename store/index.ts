import { Audio } from 'expo-av';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {  ISong } from '../types/index';

interface State {
  playlist: ISong[] | null;
  isPlaying: boolean;
}

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        playlist: null,
        isPlaying: false,
      }),
      {
        name: 'spotify-clone-storage',
      }
    )
  )
);