import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IAudio, ISong } from '../types/index';
import { Entypo } from '@expo/vector-icons';
import { useStore } from '../store';
import { FontAwesome } from '@expo/vector-icons';
import { BASE_URL } from "@env";
import axios from 'axios';
import { Audio } from 'expo-av';

const PlayerWidget = () => {
  const song = useStore((state) => state.song);
  const [audioFile, setAudioFile] = useState<IAudio>();
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async () => {
    if (sound) {
      sound.unloadAsync();
    }
    if (audioFile) {      
      console.log('Loading Sound');
      console.log(audioFile[128])
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioFile[128] },
        // { uri: 'http://websrvr90va.audiovideoweb.com/va90web25003/companions/Foundations%20of%20Rock/13.01.mp3'},
        { shouldPlay: true }
      );
      console.log("Loaded Sound")
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();
    }
  };
  useEffect(() => {
    playSound();
  }, [audioFile])
  
  // useEffect(() => {
  //   return sound
  //     ? () => {
  //       console.log('Unloading Sound');
  //       sound.unloadAsync();
  //     }
  //     : undefined;
  // }, [sound]);

  useEffect(() => {
    try {
      if (song) {
        axios.get(`${BASE_URL}/song?id=${song?.encodeId}`).then(response => {          
          setAudioFile(response.data.data)
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
      <Pressable style={{ marginLeft: "auto", marginRight: 20 }} onPress={playSound}>
        <FontAwesome name="play" size={24} color="white" />
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