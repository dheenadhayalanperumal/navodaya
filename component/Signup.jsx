import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from 'react-native';
const Logo = require("../Image/Logo.png");
import { useNavigation } from "@react-navigation/native";

export default function Signup() {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const navigation = useNavigation();

  const handleFocus = () => setIsFocused(true);
  const handleFocus1 = () => setIsFocused1(true);
  const handleBlur = () => setIsFocused(false);
  const handleBlur1 = () => setIsFocused1(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    text: {
      borderBottomWidth: 0.5,
      borderColor: '#000',
      padding: 5,
      margin: 5,
      width: '80%',
    },
    focusedText: {
      borderBottomWidth: 2,
      borderColor: '#000',
      padding: 10,
      margin: 5,
      width: '80%',
    },
    Logo: {
      width: 100,
      height: 100,
      resizeMode: "contain",
      alignSelf: "center",
    }
   
  });

  return (
    <View style={styles.container}>

      <Image style={styles.Logo} source={Logo} />
      <TextInput
        style={styles.text}
        placeholder="Enter your Name"
        onChangeText={setName}
        numberOfLines={1}
        onFocus={handleFocus}
      />
      <TextInput
        style={styles.text}
        placeholder="Enter your Phone"
        keyboardType="numeric"
        onChangeText={setPhone}
        numberOfLines={1}

      />
      <TextInput
        style={isFocused ? styles.focusedText : styles.text}
        placeholder="Enter your ID"
        keyboardType="numeric"
        onChangeText={setName}
        numberOfLines={1}
        onFocus={handleFocus}
      />
      <TextInput
        style={isFocused1 ? styles.focusedText : styles.text}
        placeholder="Enter the Password"
        secureTextEntry
        onChangeText={setPassword}
        numberOfLines={1}
      
      />
      <TextInput
        style={isFocused1 ? styles.focusedText : styles.text}
        placeholder="Confirm the Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        numberOfLines={1}
       
      />
      <Button style={styles.button}
        title="Signup"
        onPress={() =>
          console.log(`the user name ${Name}, phone ${Phone}, and password ${password}`)
        }
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
  <Text style={styles.text}>Already User,Please Login</Text>
</TouchableOpacity>

    </View>
  );
}