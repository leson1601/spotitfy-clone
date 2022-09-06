import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import { BASE_URL } from "@env";
import { IAlbumDetail } from '../types/index';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Song from '../components/Song';
import { useStore } from '../store';
const PlaylistScreen = ({ route, navigation }: RootTabScreenProps<'Playlist'>) => {
  const [album, setAlbum] = useState<IAlbumDetail | null>();
  const [pos, setPos] = React.useState(0);
  const { item } = route.params;
  useEffect(() => {
  },[]) 

  useEffect(() => {
    try {
      axios.get(`${BASE_URL}/detailplaylist?id=${item.encodeId}`).then(response => {
        setAlbum(response.data.data);
      });
    } catch (err) {
      console.log(err);
    }
    return () => {
      setAlbum(null);
    };
  }, [item]);

  useEffect(() => {
    if (pos >= 460) {
      navigation.setOptions({ headerShown: true, title: album?.title });
    } else {
      navigation.setOptions({ headerShown: true, title: "Playlist" });
    }
  },[pos])

  const onPlayPausePress = () => {
    console.log("Press");
    if (album) {
      useStore.setState({ playlist: album.song.items });
    }
  };
  return (

    <View style={styles.container}>
      {album ? <FlatList
        onScroll={(e) => setPos(e.nativeEvent.contentOffset.y)}
        data={album?.song.items}
        renderItem={({ item, index }) => <Song song={item} playlist={album?.song.items} />}
        ListHeaderComponent={<View style={{ marginBottom: 10, marginTop: 40 }}>
          <View style={{ alignItems: "center" }}>
            <Image source={{ uri: album?.thumbnailM || album?.thumbnail }} style={styles.cover} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 40 }}>
            <View>
              <Text style={styles.title}>{album?.title || item.title}</Text>
              <View>
                <Text style={styles.artist}>
                  {album?.artistsNames}
                </Text>
                <View style={styles.action}>
                  <AntDesign name="hearto" size={20} color="white" style={{ marginRight: 30 }} />
                  <Feather name="download" size={20} color="white" />
                </View>

              </View>
            </View>
            <Pressable onPress={onPlayPausePress} >

              {/* <Ionicons name="pause-circle-sharp" size={56} color="white" /> */}
              <Ionicons name="play" size={56} color="white" onPre />
            </Pressable>


          </View>
        </View>}
      /> : <Text style={{ color: "white", width: "100%", textAlign: "center", fontSize: 20, fontWeight: '700' }}>Loading...</Text>}


    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',

    paddingHorizontal: 10,
    paddingBottom: 110
  },
  cover: {
    width: 300,
    aspectRatio: 1
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: "white",
    maxWidth: 280

  },
  artist: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    maxWidth: 260,
  },
  action: {
    flexDirection: "row",
    marginTop: 10

  }
});