import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home'
import { AppLoading } from 'expo';
import {
  useFonts,
  Play_400Regular,
  Play_700Bold
} from '@expo-google-fonts/play';

import Header from './src/components/Header'

export default function App() {
  const [fontsLoaded] = useFonts({
    Play_400Regular,
    Play_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading></AppLoading>
  }
  else{
    return (
      <View style={styles.container}>
        <Header></Header>
        <Home></Home>
        <StatusBar style="light" />
      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F34',
  }
});
