import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useStore } from '../store';


const NowPlaying = () => {
  const playlist = useStore((state) => state.playlist);

  const song = playlist ? playlist[0] : null;

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: song?.thumbnailM }} style={styles.cover} />
      </View>
      <View>
        <Text style={styles.title}>{song?.title}</Text>
        <Text style={styles.artist}>{song?.artistsNames}</Text>
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
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: "white",
    maxWidth: 280,
    marginTop: 20

  },
  artist: {
    color: "#B3B3B3",
    fontSize: 14,
    fontWeight: "500",
    maxWidth: 260,
  },
});