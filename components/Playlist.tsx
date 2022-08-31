import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IPlaylist, IAlbum } from '../types/index';
import Album from './Album';

const Playlist = ({ playlist }: { playlist: IPlaylist; }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{playlist.title || (playlist.sectionId === "hAlbum" && "Album")}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={playlist.items as IAlbum[]} renderItem={({ item, index }) => <Album item={item} firstOrLast={index === 0 ? "first" : index === (playlist.items as IAlbum[]).length - 1 ? "last" : ""} />} />

    </View>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 19,
    marginBottom: 8
  },
  container: {
    flex: 1,
    marginBottom: 20,
  }
});