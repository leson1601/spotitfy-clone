/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Text, View } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import PlaylistScreen from '../screens/PlaylistScreen';
import NowPlaying from '../screens/NowPlaying';
import PlayerWidget from '../components/PlayerWidget';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName; }) {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = React.useState<string | undefined>("");

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={
        () => {
          if (navigationRef.isReady()) {
            setCurrentRoute(navigationRef.getCurrentRoute()?.name);
          }
        }
      }
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>     
      <RootNavigator />
      <PlayerWidget isShown={currentRoute === "NowPlaying" ? false : true} />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Screen name="NowPlaying" component={NowPlaying} options={{
        headerShown: true,
      }} />

    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          backgroundColor: 'rgba(0,0,0,1)',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
        }
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          headerShown: false,
          tabBarLabelStyle: {
            marginBottom: 4
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,

        })}
      />
      <BottomTab.Screen
        name="Search"
        component={LibraryScreen}
        options={{
          title: 'Search',
          headerShown: true,
          tabBarLabelStyle: {
            marginBottom: 4
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: 'Library',
          tabBarLabelStyle: {
            marginBottom: 4
          },
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookshelf" size={20} color={color} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen name="Playlist" component={PlaylistScreen} options={{
        headerShown: false,
        tabBarButton: () => null,
      }} />

    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}
