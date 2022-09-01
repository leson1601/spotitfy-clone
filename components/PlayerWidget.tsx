import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { ISong } from '../types/index';
import { Entypo } from '@expo/vector-icons';
import { useStore } from '../store';
import { FontAwesome } from '@expo/vector-icons';
import { BASE_URL } from "@env";
import axios from 'axios';

const PlayerWidget = () => {
  const song = useStore((state) => state.song);
  useEffect(() => {
    try {
      if (song) {

        axios.get(`${BASE_URL}/song?id=${song?.encodeId}`).then(response => {
          console.log(response.data);
         
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [song]);
  return (
    <View style={song ? styles.container : { display: 'none' }}>
      <Image source={{ uri: song?.thumbnail }} style={styles.cover} />
      <View>
        <Text style={styles.title} numberOfLines={1}>{song?.title}</Text>
        <View>
          <Text style={styles.artist} numberOfLines={1}>{song?.artistsNames}</Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto", marginRight: 20 }}>
        <FontAwesome name="play" size={24} color="white" />
      </View>
    </View>
  );
};

export default PlayerWidget;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 49,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10

  },
  cover: {
    width: 38,
    height: 38,
    borderRadius: 6,
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