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
    if (duration) return (position / duration) * 100;
    else return 0;
  };


  const handleOnValueChange = (value: number) => {

    useSoundStore.setState({ position: value * duration / 100 });

    // if (sound?.getStatusAsync) {
    //   sound?.getStatusAsync().then(status => {
    //     if (status && 'durationMillis' in status && status.durationMillis) {
    //       const newPos = (value * status.durationMillis) / 100;
    //       sound.setPositionAsync(newPos);

    //       if (!status.isPlaying) {
    //         sound.setStatusAsync({ shouldPlay: true, positionMillis: newPos });
    //       } else {
    //         sound.setPositionAsync(newPos);
    //       }

    //     }
    //   });
    // }
  };
  const handleOnSlidingStart = async () => {
    if (!sound) return;
    else {
      await sound.pauseAsync();
    }
  };

  const handleOnSlidingComplete = async (value: number) => {
    if (!sound) return;
    else {
      await sound.pauseAsync();
      await sound.setPositionAsync(Math.floor(value * duration / 100));
      await sound.playAsync();

    }
  };
  return (

      <Slider
        style={styles.container}
        // disabled={disabled}
        value={progressBarPosition()}
        tapToSeek={true}
        minimumValue={0}
        maximumValue={100}
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
    height:30,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  progress: {
    backgroundColor: '#B2B2B2',
    height: '100%',
    borderRadius: 4,
  }
});