import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import { BASE_URL } from "@env";
import { IAlbumDetail } from '../types/index';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Song from '../components/Song';
const PlaylistScreen = ({ route, navigation }: RootTabScreenProps<'Playlist'>) => {
  const [album, setAlbum] = useState<IAlbumDetail>();
  const { item } = route.params;
  useEffect(() => {
    try {

      axios.get(`${BASE_URL}/detailplaylist?id=${item.encodeId}`).then(response => {
        setAlbum(response.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <View style={styles.container}>

      <FlatList
        data={album?.song.items}
        renderItem={({ item, index }) => <Song song={item} />}
        ListHeaderComponent={<View style={{ marginBottom: 10 }}>
          <View style={{ alignItems: "center" }}>
            <Image source={{ uri: album?.thumbnail }} style={styles.cover} />
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
            <View>
              <Ionicons name="pause-circle-sharp" size={56} color="white" />
            </View>
          </View>
        </View>}
      />
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 110
  },
  cover: {
    width: 230,
    height: 230,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: "white",

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