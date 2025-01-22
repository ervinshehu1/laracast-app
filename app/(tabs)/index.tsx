
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';


import Feather from '@expo/vector-icons/Feather';


export default function App() {
const [text, setText] = useState('')

function onPress(){
  Alert.alert('Touchable Opacity Pressed');
}

  return (
    <View style={styles.container}>
      <Text style={{color:'red'}}>
        One more edit Open edit this up App.js to start working on your app!
      </Text>
      <Button
          title="Press me"
          color='red'
          onPress={() => Alert.alert('Simple Button pressed')}
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>
          <Feather name="settings" size={24} color="black" />
          </Text>
          <Text>Press Here</Text>
        </TouchableOpacity>
        <View style={{marginTop: 60 }}>
        <Pressable 
        style={styles.button}
        onPressIn={() => console.log('pressing in')}
        onPressOut={() => console.log('pressing out')}
        onLongPress={() => console.log('long press')}
        hitSlop={20}
        >
        <Text>Pressable Here</Text>
        </Pressable>
        </View>
        <View>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
        />
        <Text>{text}</Text>
        </View>
      </View>
  );
}
      

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 60,
   //justifyContent: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    width: 300,
    borderWidth: 1,
    padding: 10,
  },
});