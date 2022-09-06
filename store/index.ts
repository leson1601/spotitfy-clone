import { Audio } from 'expo-av';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {  ISong } from '../types/index';

interface State {
  playlist: ISong[] | null;
}

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        playlist: null,
      }),
      {
        name: 'spotify-clone-storage',
      }
    )
  )
);