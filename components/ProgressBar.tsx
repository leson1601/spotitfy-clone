import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useSoundStore } from '../store';
import { Slider } from '@miblanchard/react-native-slider';

const ProgressBar = ({ disabled }: { disabled: boolean; }) => {
  const sound = useSoundStore((state) => state.sound);
  const duration = useSoundStore((state) => state.duration);

  const progressBarPosition = () => {
    const duration = useSoundStore((state) => state.duration);
    const position = useSoundStore((state) => state.position);
    if (duration) return (position / duration) * 100;
    else return 0;
  };


  const handleOnValueChange = async (value: number) => {
    // useSoundStore.setState({ position: value * duration / 100 });
    console.log(value)
    if (!sound) return;
    else {      
      await sound.setPositionAsync(Math.floor(value * duration / 100));     
    }
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
      await sound.setPositionAsync(Math.floor(value * duration / 100));
      await sound.playAsync();

    }
  };
  return (
    <Slider
      containerStyle={styles.container}
      value={progressBarPosition()}
      disabled={disabled}
      minimumValue={0}
      maximumValue={100}
      minimumTrackTintColor="#B2B2B2"
      maximumTrackTintColor="transparent"
      onValueChange={(value) => handleOnValueChange(value as number)}
      // onSlidingStart={handleOnSlidingStart}
      onSlidingComplete={(value) => handleOnSlidingComplete(value as number)}
      thumbStyle={styles.thumb}
      // trackClickable={true}
      thumbTouchSize={{ width: 30, height: 30 }}
      debugTouchArea
    />

  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 4,

  },
  thumb: {
    width: 13,
    height: 13,
    color: "white",
    backgroundColor: "white",
  }
});