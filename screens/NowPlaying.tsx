import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useSoundStore } from '../store';

import { AntDesign } from '@expo/vector-icons';
import ProgressBar from '../components/ProgressBar';

const NowPlaying = () => {
  const playlist = useSoundStore((state) => state.playlist);

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
        marginTop: 20 }}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>{song?.title}</Text>
          <Text style={styles.artist}>{song?.artistsNames}</Text>
        </View>
          <AntDesign name="hearto" size={20} color="white" style={{ marginRight: 30 }} />
       
      </View>
      <View>
        <ProgressBar  disabled={false} />
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
});