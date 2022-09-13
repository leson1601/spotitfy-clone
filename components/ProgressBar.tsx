import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { useSoundStore } from '../store';

const ProgressBar = ({ disabled }: { disabled: boolean; }) => {
  const sound = useSoundStore((state) => state.sound);
  const duration = useSoundStore((state) => state.duration);

  const progressBarPosition = () => {
    const duration = useSoundStore((state) => state.duration);
    const position = useSoundStore((state) => state.position);
    if (duration) return (position / duration);
    else return 0;
  };


  const handleOnValueChange = (value: number) => {
    if (sound) {
      useSoundStore.setState({ position: value * duration });
    }

  };
  const handleOnSlidingStart = async () => {
    if (!sound) return;
    else {
      await sound.pauseAsync();
    }
  };

  const handleOnSlidingComplete = async (value: number) => {    
    if(sound) {
      // await sound.setPositionAsync(Math.floor(value * duration / 100));
      await sound.setPositionAsync(value * duration);
      await sound.playAsync();

    }
  };
  return (

    <Slider
      style={[styles.container, { height: disabled ? 0 : 40 }]}
      // disabled={disabled}
      value={progressBarPosition()}
      tapToSeek={true}

      minimumTrackTintColor="#B2B2B2"
      maximumTrackTintColor="transparent"
      onValueChange={(value) => handleOnValueChange(value)}
      onSlidingStart={handleOnSlidingStart}
      onSlidingComplete={(value) => handleOnSlidingComplete(value)}
    />
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: -15,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  progress: {
    backgroundColor: '#B2B2B2',
    height: '100%',
    borderRadius: 4,
  }
});