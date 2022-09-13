import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useSoundStore } from '../store';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ProgressBar from '../components/ProgressBar';
import { millisToMinutesAndSeconds } from '../utils';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const NowPlaying = () => {
  const playlist = useSoundStore((state) => state.playlist);
  const isPlaying = useSoundStore((state) => state.isPlaying);

  const duration = useSoundStore((state) => state.duration);
  const position = useSoundStore((state) => state.position);
  const song = playlist ? playlist[0] : null;

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: song?.thumbnailM }} style={styles.cover} />
      </View>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
      }}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>{song?.title}</Text>
          <Text style={styles.artist}>{song?.artistsNames}</Text>
        </View>
        <AntDesign name="hearto" size={20} color="white" style={{ marginRight: 30 }} />

      </View>
      <View>
        <View style={{ marginVertical: 10 }}>
          <ProgressBar disabled={false} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.time}>{millisToMinutesAndSeconds(position)}</Text>
          <Text style={styles.time}>{millisToMinutesAndSeconds(duration)}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <FontAwesome5 name="random" size={24} color="white" />
        </View>
        <View>
          <Entypo name="controller-jump-to-start" size={24} color="white" />
        </View>
        <View>
          <FontAwesome name={isPlaying ? 'pause' : "play"} size={30} color="white" />
        </View>
        <View>
          <Entypo name="controller-next" size={24} color="white" />
        </View>
        <View>
          <Feather name="repeat" size={24} color="white" />
        </View>
      </View>
      <View>
      </View>
    </View>
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  cover: {
    width: "100%",
    aspectRatio: 1,
  },
  leftContainer: {

  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: "white",
    maxWidth: 280,
  },
  artist: {
    color: "#B3B3B3",
    fontSize: 14,
    fontWeight: "500",
    maxWidth: 260,
  },
  time: {
    color: "white"
  }
});