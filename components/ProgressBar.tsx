import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProgressBar = ({procent}: { procent: number}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, {width: `${procent*100}%`}]}></View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 3,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  progress:  {
    backgroundColor: '#B2B2B2',
    height: '100%',
    borderRadius: 4,
  }
})