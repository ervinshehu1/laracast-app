import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {Ionicons} from '@expo/vector-icons'
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
    <Stack.Navigator screenOptions={{ headerShown: true, }}>
      <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false}}/>
      <Stack.Screen name="NewTweet" component={NewTweet} options={{title:''}}/>
      <Stack.Screen name="Tweet Screen" component={TweetScreen} options={{title:''}}/>
      <Stack.Screen name="Profile Screen" component={ProfileScreen} options={{title:''}}/>
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
    }}>
      <Tab.Screen 
      name="Home1" 
      component={HomeScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="home" size={size} color={color}/>
        ),
      }}
      />
      <Tab.Screen 
      name="Search" 
      component={SearchScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="search" size={size} color={color}/>
        ),
      }}/>
      <Tab.Screen 
      name="Notifications" 
      component={NotificationsScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="notifications" size={size} color={color}/>
        ),
      }}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{
          headerShown: true,
        }}>
          <Drawer.Screen name="Home" component={HomeStackNavigator}/>
          <Drawer.Screen name="Settings" component={SettingsScreen}/>
        </Drawer.Navigator>
      </NavigationContainer>
      </NavigationIndependentTree>
  );
}