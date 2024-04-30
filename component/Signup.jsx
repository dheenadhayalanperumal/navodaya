import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { useState } from "react";

export default function Signup() {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleFocus1 = () => setIsFocused1(true);
  const handleBlur = () => setIsFocused(false);
  const handleBlur1 = () => setIsFocused1(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      borderWidth: 1,
      borderColor: '#000',
      padding: 10,
      margin: 5,
      width: '80%',
    },
    focusedText: {
      borderWidth: 2,
      borderColor: '#000',
      padding: 10,
      margin: 5,
      width: '80%',
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        placeholder="Enter your Name"
        onChangeText={setName}
        numberOfLines={1}
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
      <TextInput
        style={isFocused1 ? styles.focusedText : styles.text}
        placeholder="Confirm the Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        numberOfLines={1}
        onFocus={handleFocus1}
        onBlur={handleBlur1}
      />
      <Button
        title="Signup"
        onPress={() =>
          console.log(`the user name ${Name}, phone ${Phone}, and password ${password}`)
        }
      />
    </View>
  );
}