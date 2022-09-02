import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PlayerWidget from './components/PlayerWidget';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { View } from './components/Themed';
import { Platform } from 'react-native';
import Constants from 'expo-constants';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />

            <PlayerWidget />
            <StatusBar />

        </SafeAreaProvider>
      </RootSiblingParent>
    );
  }
}
