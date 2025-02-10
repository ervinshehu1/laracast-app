import React, { useContext, useEffect } from 'react';
import {
    Text,
    View,
  } from 'react-native';
  import axiosConfig from "../helpers/axiosConfig";
import { AuthContext } from '@/context/AuthProvider';

  export default function SearchScreen() {
      const { user } = useContext(AuthContext);
    

    useEffect(() =>{
      axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
          axiosConfig
            .get("/user")
            .then(response => {
              console.log(user.avatar);
            })
            .catch((error) => {
              console.log(error);
              
            });
    }, [])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Searc Screen</Text>
      </View>
    );
  }