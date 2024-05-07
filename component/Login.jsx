import React, { useState } from "react";
import { StyleSheet, Button, TextInput, View, Image,Text ,TouchableWithoutFeedback,Keyboard} from "react-native";
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View>
        <Image style={styles.Logo} source={Logo} />
        <TextInput
          style={isFocused ? styles.focusedText : styles.text}
          placeholder="Enter your ID"
          placeholderTextColor="#fff" 
          // keyboardType="numeric"
          onChangeText={setData}
          numberOfLines={1}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TextInput
          style={isFocused1 ? styles.focusedText : styles.text}
          placeholder="Enter the Password"
          placeholderTextColor="#fff" 
          secureTextEntry
          onChangeText={setPassword}
          numberOfLines={1}
          onFocus={handleFocus1}
          onBlur={handleBlur1}
        />
      <TouchableOpacity style={styles.Button} onPress={handleLogin}>
  <Text style={styles.ButtonText}>Login</Text>
</TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
  <Text style={styles.text}>Don't have an account? Sign up.</Text>
</TouchableOpacity> */}
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A20A3A",
    alignItems: "center",
    justifyContent:'space-around'
  },
  Button: {
    color: "#000",
    backgroundColor: "#FFAA10",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: 296,
    height: 43,
    padding: 10,
    marginTop: 10,
    textAlign: "center",
  },
  ButtonText:{
    color:"#000",
    textAlign:"center",
    fontSize:16,
  },
  Logo: {
    width: 234,
    height: 217,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom:50,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    color: "#FFF",
    fontSize: 15,
    borderWidth: 0.5,
    borderColor: "#fff",
    height:43,
    width: 296,
    padding: 10,

  },
  focusedText: {
    marginTop: 10,
    marginBottom: 10,
    height:43,
    width: 296,
    color: "#fff",
    fontSize: 15,
    borderWidth: 2,
    borderColor:"#fff",   
    Animation: "fadeIn 0.5s",
  },
});
