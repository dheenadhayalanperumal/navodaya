import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import Login from './component/Login';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000' : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      color: darkMode ? '#fff' : '#000',

    },
    text: {
      color: darkMode ? '#fff' : '#000',
      padding: 10,
    },
  });

  return (
    <View style={styles.container}>
      {/* <Button title="Toggle Dark Mode" onPress={() => setDarkMode(!darkMode)} />  */}
      <Text style={styles.text}> Welcome to our App!</Text>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      
      <Login darkMode={darkMode} />
    </View>
  );
}