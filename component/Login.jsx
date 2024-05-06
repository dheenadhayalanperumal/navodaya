import React, { useState } from "react";
import { StyleSheet, Button, TextInput, View, Image,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logo = require("../Image/Logo.png");

export default function Login() {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleFocus1 = () => setIsFocused1(true);
  const handleBlur = () => setIsFocused(false);
  const handleBlur1 = () => setIsFocused1(false);

  const handleLogin = async () => { // Add async here
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        }),
      });
  
      const data = await response.json();
      console.log(data);
      await AsyncStorage.setItem('isLoggedIn', '1');
      
      // replace this with the actual condition for a successful login
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.Logo} source={Logo} />
        <TextInput
          style={isFocused ? styles.focusedText : styles.text}
          placeholder="Enter your ID"
          // keyboardType="numeric"
          onChangeText={setData}
          numberOfLines={1}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TextInput
          style={isFocused1 ? styles.focusedText : styles.text}
          placeholder="Enter the Password"
          secureTextEntry
          onChangeText={setPassword}
          numberOfLines={1}
          onFocus={handleFocus1}
          onBlur={handleBlur1}
        />
        <Button title="Login" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
  <Text style={styles.text}>Don't have an account? Sign up.</Text>
</TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
  },
  Logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    color: "#000",
    fontSize: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
  },
  focusedText: {
    marginTop: 10,
    marginBottom: 10,
    color: "#000",
    fontSize: 15,
    borderBottomWidth: 2, // Increase border width
    borderBottomColor: "#000",
    Animation: "fadeIn 0.5s",
  },
});
