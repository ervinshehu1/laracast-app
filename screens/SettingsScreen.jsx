import { AuthContext } from '@/context/AuthProvider';
import React, { useContext } from 'react';
import {
  Button,
    Text,
    View,
  } from 'react-native';

  export default function SettingsScreen() {
    const {logout} = useContext(AuthContext);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
        <Button title="Logout" onPress={logout}/>
      </View>
    );
  }