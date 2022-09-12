import { Audio, AVPlaybackStatusError, AVPlaybackStatusSuccess } from 'expo-av';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ISong } from '../types/index';

interface SoundState {
  playlist: ISong[];
  isPlaying: boolean;
  sound: Audio.Sound | null;
  position: number;
  duration: number;
}

export const useSoundStore = create<SoundState>()(
  devtools(
    persist(
      (set) => ({
        playlist: [],
        isPlaying: false,
        sound: null,
        position: 0,
        duration: 0
      }),
      {
        name: 'spotify-clone-storage',
      }
    )
  )
);