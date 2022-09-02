import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IAudio } from '../types/index';
import { useStore } from '../store';
import { FontAwesome } from '@expo/vector-icons';
import { BASE_URL } from "@env";
import axios from 'axios';
import { Audio, AVPlaybackStatusError, AVPlaybackStatusSuccess } from 'expo-av';

const PlayerWidget = () => {
  const song = useStore((state) => state.song);

  const [sound, setSound] = React.useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  useEffect(() => {
    getAudio();
  }, [song]);

  const getAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      if (song) {
        axios.get(`${BASE_URL}/song?id=${song?.encodeId}`).then(async (response) => {
         
          if (response.data.data && response.data.data[128]) {            
            const audioURI = response.data.data[128];
            console.log(audioURI);
            console.log("Loading Song");
            // const sound = new Audio.Sound();
            // await sound.loadAsync({ uri: audioURI })
            
            const { sound } = await Audio.Sound.createAsync(
              { uri: audioURI }
            );
            setSound(sound);
            console.log("Loaded Song");
            await sound.playAsync();
            setIsPlaying(true);
          } else {
            console.log(response.data)
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const playAudio = async () => {
    if (sound) {
      console.log('Playing Sound');
      await sound.playAsync();
    } else {
      console.log("no song are chosen");
    }
  };
  const handleOnPress = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  return (
    <View style={song ? styles.container : { display: 'none' }}>
      <Image source={{ uri: song?.thumbnail }} style={styles.cover} />
      <View>
        <Text style={styles.title} numberOfLines={1}>{song?.title}</Text>
        <View>
          <Text style={styles.artist} numberOfLines={1}>{song?.artistsNames}</Text>
        </View>
      </View>
      <Pressable style={{ marginLeft: "auto", paddingHorizontal: 20, height: "100%", justifyContent: 'center', alignItems: "center", backgroundColor: "red" }} onPress={handleOnPress}>
        <FontAwesome name={isPlaying ? 'pause' : "play"} size={24} color="white" />
      </Pressable>
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