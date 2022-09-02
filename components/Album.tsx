import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IAlbum } from '../types/index';
import { useNavigation } from '@react-navigation/native';

const Album = ({ item, firstOrLast }: { item: IAlbum, firstOrLast: string; }) => {
  const navigation = useNavigation();
  const containerStyle = (firstOrLast: string) => {
    if (firstOrLast === "first")
      return {
        marginRight: 8
      };
    else if (firstOrLast === "last") return {
      marginLeft: 8
    };
    else return {
      marginHorizontal: 8
    };
  };
  const handleOnPress = () => {
    navigation.navigate('Playlist', { item });
  };

  return (
    <Pressable onPress={handleOnPress} style={({ pressed }) => ({
      opacity: pressed ? 0.5 : 1
    })}>

      <View style={containerStyle(firstOrLast)}>
        <Image source={{ uri: item?.thumbnail }} style={styles.cover} />
        <Text style={styles.title} numberOfLines={2}>{item?.title}</Text>
      </View>
    </Pressable>
  );
};

export default Album;

const styles = StyleSheet.create({

  cover: {
    width: 105,
    height: 105
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: "white",
    textAlign: "center",
    maxWidth: 105,
    marginTop: 5,
  }
});