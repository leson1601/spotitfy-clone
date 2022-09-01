import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ISong } from '../types/index';

interface State {
  bears: number;
  song: ISong | null;
  increase: (by: number) => void;
}

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        song:null,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
);