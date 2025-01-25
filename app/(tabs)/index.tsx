import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  NavigationContainer,  
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../../screens/HomeScreen";
import NewTweet from "../../screens/NewTweet"
import TweetScreen from "../../screens/TweetScreen"
import ProfileScreen from "../../screens/ProfileScreen"
import SettingsScreen from "../../screens/SettingsScreen"
import NotificationsScreen from "../../screens/NotificationsScreen"
import SearchScreen from "../../screens/SearchScreen"

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home1" component={HomeScreen}/> */}
      <Stack.Screen name="Tab" component={TabNavigator}/>
      <Stack.Screen name="NewTweet" component={NewTweet}/>
      <Stack.Screen name="Tweet Screen" component={TweetScreen}/>
      <Stack.Screen name="Profile Screen" component={ProfileScreen}/>
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home1" component={HomeScreen}/>
      <Tab.Screen name="Search" component={SearchScreen}/>
      <Tab.Screen name="Notifications" component={NotificationsScreen}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeStackNavigator}/>
          <Drawer.Screen name="Settings" component={SettingsScreen}/>
        </Drawer.Navigator>
      </NavigationContainer>
      </NavigationIndependentTree>
  );
}