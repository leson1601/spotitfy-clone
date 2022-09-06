import { Audio } from 'expo-av';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ISong } from '../types/index';

interface State {
  playlist: ISong[] | null;
  isPlaying: boolean;
  sound: Audio.Sound | null;
}

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        playlist: null,
        isPlaying: false,
        sound: null
      }),
      {
        name: 'spotify-clone-storage',
      }
    )
  )
);