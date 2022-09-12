import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSoundStore } from '../store';
import { FontAwesome } from '@expo/vector-icons';
import { BASE_URL } from "@env";
import axios from 'axios';
import { Audio, AVPlaybackStatus } from 'expo-av';
import Toast from 'react-native-root-toast';
import ProgressBar from './ProgressBar';
import { useNavigation } from '@react-navigation/native';


const PlayerWidget = ({ isShown }: { isShown: boolean; }) => {
  const navigation = useNavigation();
  const playlist = useSoundStore((state) => state.playlist);
  const song = playlist[0];
  const isPlaying = useSoundStore((state) => state.isPlaying);
  const sound = useSoundStore((state) => state.sound);


  useEffect(() => {
    getAudio();
  }, [song]);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    // const song = playlist ? playlist[0] : null;
    if ('isPlaying' in status) {
      useSoundStore.setState({ isPlaying: status.isPlaying });
    }

    if (("positionMillis" in status) && ('durationMillis' in status)) {
      if (status.durationMillis) {
        useSoundStore.setState({ position: status.positionMillis, duration: status.durationMillis });
      }
    }
    if ("didJustFinish" in status && status.didJustFinish) {
      console.log("finish");
      nextAudio();
    }
  };

  const getAudio = async () => {
    console.log("getAudio");
    useSoundStore.setState({ duration: 0, position: 0 });

    if (sound && sound.unloadAsync) {
      await sound.unloadAsync();
      useSoundStore.setState({ sound: null });
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

            const { sound, status } = await Audio.Sound.createAsync(
              { uri: audioURI },
              {
                progressUpdateIntervalMillis: 10,
                shouldPlay: true
              },
              onPlaybackStatusUpdate
            );
            useSoundStore.setState({ sound: sound });
            await sound.playAsync();

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
        pauseAudio();
      } else {
        playAudio();
      }
    }
  };

  const playAudio = async () => {
    await sound?.playAsync();
    useSoundStore.setState({ isPlaying: true });

  };
  const pauseAudio = async () => {
    await sound?.pauseAsync();
    useSoundStore.setState({ isPlaying: false });

  };

  const nextAudio = () => {
    const newPlaylistArr = playlist.splice(1).concat(playlist.splice(0, 1));


    useSoundStore.setState({ playlist: newPlaylistArr });

  };

  return (
    <View style={[{ display: isShown ? "flex" : "none" }, song ? styles.container : { display: 'none' }]} >
      <Pressable style={styles.topContainer} onPress={onContainerPress}>
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
      </Pressable>
      <View>
        <ProgressBar disabled={true} />
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