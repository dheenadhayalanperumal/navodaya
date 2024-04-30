import React, { useState } from "react";
import { StyleSheet, Button, TextInput, View, Image } from "react-native";


const Logo = require("../Image/Logo.png");

export default function Login() {
 
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleFocus1 = () => setIsFocused1(true);
  const handleBlur = () => setIsFocused(false);
  const handleBlur1 = () => setIsFocused1(false);

  return (
    <View style={styles.container}>
      <Image style={styles.Logo} source={Logo} />
      <TextInput
        style={isFocused ? styles.focusedText : styles.text}
        placeholder="Enter your ID"
        keyboardType="numeric"
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
      <Button
        title="Login"
        onPress={() =>
          console.log(`the user id ${data} and password ${password}`)
        }
      />
    
    </View>
  );
}
const styles = StyleSheet.create({
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
