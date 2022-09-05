import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IAudio } from '../types/index';
import { useStore } from '../store';
import { FontAwesome } from '@expo/vector-icons';
import { BASE_URL } from "@env";
import axios from 'axios';
import { Audio, AVPlaybackStatus } from 'expo-av';
import Toast from 'react-native-root-toast';
import ProgressBar from './ProgressBar';
import { useNavigation } from '@react-navigation/native';

const PlayerWidget = () => {
  const navigation = useNavigation();
  const playlist = useStore((state) => state.playlist);
  const song = playlist ? playlist[0] : null;
  const [progressProcent, setPorgressProcent] = useState<number>(0);

  const [sound, setSound] = React.useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  useEffect(() => {
    setPorgressProcent(0);
    getAudio();
  }, [song]);


  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if ('isPlaying' in status) {
      setIsPlaying(status.isPlaying);
    }
    if (("positionMillis" in status) && ('durationMillis' in status)) {
      if (status.durationMillis) {
        setPorgressProcent(status.positionMillis / status.durationMillis);
      }
    }
  };

  const getAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    try {
      if (song) {
        const loadingToast = Toast.show("Loading", {
          duration: 10000,
          position: -56
        });
        axios.get(`${BASE_URL}/song?id=${song?.encodeId}`).then(async (response) => {

          if (response.data.data && response.data.data[128]) {
            const audioURI = response.data.data[128];
            console.log(audioURI);

            const { sound } = await Audio.Sound.createAsync(
              { uri: audioURI },
              { shouldPlay: true },
              onPlaybackStatusUpdate
            );

            setSound(sound);

            await sound.playAsync();
            setIsPlaying(true);
          } else {
            const toast = Toast.show(response.data.msg, {
              duration: Toast.durations.SHORT,
              position: 0,
            });
          }
          Toast.hide(loadingToast);
        });

      }
    } catch (error) {
      console.log(error);
    }
  };

  const onContainerPress = () => {
    navigation.navigate("NowPlaying");
  };
  const onPlayPausePress = async () => {
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
    <Pressable style={song ? styles.container : { display: 'none' }} onPress={onContainerPress}>
      <View style={styles.topContainer}>
        <Image source={{ uri: song?.thumbnail }} style={styles.cover} />
        <View>
          <Text style={styles.title} numberOfLines={1}>{song?.title}</Text>
          <View>
            <Text style={styles.artist} numberOfLines={1}>{song?.artistsNames}</Text>
          </View>
        </View>
        <Pressable style={styles.playButton} onPress={onPlayPausePress}>
          <FontAwesome name={isPlaying ? 'pause' : "play"} size={24} color="white" />
        </Pressable>
      </View>
      <ProgressBar procent={progressProcent} />

    </Pressable>
  );
};
export default PlayerWidget;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 49,
    left: 0,
    right: 0,
    backgroundColor: "gray",
    paddingHorizontal: 10,
    paddingTop: 8,
    borderRadius: 10
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
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
    fontWeight: "500",
    maxWidth: 280
  },
  playButton: {
    marginLeft: "auto",
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: 'center',
    alignItems: "center",
  }
});