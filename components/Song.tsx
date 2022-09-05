import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ISong } from '../types/index';
import { Entypo } from '@expo/vector-icons';
import { useStore } from '../store';

const Song = ({ song, playlist }: { song: ISong, playlist: ISong[]}) => {
  
  const handleOnPress = () => {
    const index = playlist.indexOf(song)
    const tailPlaylist = playlist.slice(0, index)
    const headPlaylist = playlist.slice(index)
    const newPlaylist = headPlaylist.concat(tailPlaylist)    
    useStore.setState({ playlist: newPlaylist});
  };
  return (
    <Pressable style={styles.container} onPress={handleOnPress} >
      <Image source={{ uri: song.thumbnail }} style={styles.cover} />

      <View>
        <Text style={styles.title} numberOfLines={1}>{song.title}</Text>
        <View>
          <Text style={styles.artist} numberOfLines={1}>{song.artistsNames}</Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Entypo name="dots-three-horizontal" size={24} color="white" />
      </View>
    </Pressable>
  );
};

export default Song;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7
  },
  cover: {
    width: 48,
    height: 48,
    marginRight: 10
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    maxWidth: 250
  },
  artist: {
    color: "#B3B3B3",
    fontSize: 13,
    fontWeight: "500"
  }
});