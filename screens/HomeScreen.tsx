import { FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from "@env";
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { IPlaylist } from '../types/index';
import Playlist from '../components/Playlist';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const greetMessage = (): string => {
    const now = new Date().getHours();
    if (now >= 6 && now <= 12) return "Good Morning";
    else if (now >= 13 && now <= 19) return "Good Afternoon";
    return "Good Evening";
  };

  const [playlist, setPlaylist] = useState<IPlaylist[]>([]);
  useEffect(() => {
    try {
      axios.get(`${BASE_URL}/home`).then(response => {
        const sectionTypeArr = ["banner", "adBanner", "recentPlaylist", "new-release", "event", "artistSpotlight", "weekChart", "RTChart"];
        const list = response.data.data.items.filter((item: { sectionType: string; }) => !sectionTypeArr.includes(item.sectionType));
        setPlaylist(list);
      });

    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{greetMessage()}</Text>
        <View style={styles.headerRight}>
          <Feather name="bell" size={24} color="white" />
          <MaterialCommunityIcons name="progress-clock" size={24} color="white" style={{ marginLeft: 20 }} />
          <Ionicons name="settings-outline" size={24} color="white" style={{ marginLeft: 20 }} />
        </View>
      </View>
      <View>
        <FlatList
          style={{ flex: 1, marginBottom: 20 }}
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
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10

  },
  headerRight: {
    flexDirection: 'row',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "left",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
