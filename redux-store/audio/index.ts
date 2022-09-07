import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Audio } from 'expo-av';
import { ISong } from '../../types/index';

export interface AudioState {
  playlist: ISong[] | null;
  isPlaying: boolean;
  sound: Audio.Sound | null;
  position: number;
  duration: number;
}
const initialState: AudioState = {
  playlist: null,
  isPlaying: false,
  sound: null,
  position: 0,
  duration: 0
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    }
  }
});

export const { play, pause, } = audioSlice.actions;
export default audioSlice.reducer;