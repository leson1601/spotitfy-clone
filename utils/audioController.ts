import { useSoundStore } from '../store';
import { BASE_URL } from "@env";
import axios from 'axios';
import { Audio, AVPlaybackStatus } from 'expo-av';
import Toast from 'react-native-root-toast';
import { ISong } from '../types/index';

const audioController =() => {
  const playlist = useSoundStore((state) => state.playlist);
  const isPlaying = useSoundStore((state) => state.isPlaying);
  const sound = useSoundStore((state) => state.sound);
  const song = playlist[0];

 

  

  const onPlayPausePress = async () => {
    if (sound) {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    }
  };

  const playAudio = async () => {
    await sound?.playAsync();
    useSoundStore.setState({ isPlaying: true });

  };
  const pauseAudio = async () => {
    await sound?.pauseAsync();
    useSoundStore.setState({ isPlaying: false });
  };
  const nextAudio = () => {
    const newPlaylistArr = playlist.splice(1).concat(playlist.splice(0, 1));
    useSoundStore.setState({ playlist: newPlaylistArr });
  };

 

  return {
    onPlayPausePress,
    nextAudio

  }
};




export {
  audioController
};