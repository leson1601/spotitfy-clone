import { FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from "@env";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from 'react';
import { IPlaylist } from '../types/index';
import Playlist from '../components/Playlist';


export default function HomeScreen() {
  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);
  useEffect(() => {
    axios.get(`${BASE_URL}/home`).then(response => {
      const sectionTypeArr = ["banner", "adBanner", "recentPlaylist", "new-release", "event", "artistSpotlight", "weekChart", "RTChart"];
      const list = response.data.data.items.filter((item: { sectionType: string; }) => !sectionTypeArr.includes(item.sectionType));
      setPlaylist(list);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View>
        <FlatList
          style={{flex:1, marginBottom: 20}}
          data={playlist}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <Playlist playlist={item} />;
          }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
