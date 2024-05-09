import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";

const Logo = require("../Image/empImg.png");

const Password = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />

        <Text style={styles.textName}>Employee Profile</Text>
        <Text style={styles.textID1}>123456</Text>
      </View>
     
      <View style={styles.form} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <Text style={styles.text}>Current Password</Text>
          <TextInput
            style={styles.input}
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            secureTextEntry={true}
          />

          <Text style={styles.text}>New Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <Text style={styles.text}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
          />
        </View>
        </TouchableWithoutFeedback>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 215,
    width: "100%",
    backgroundColor: "#303651",
  },
  form: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
    color: "#4A516D",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E6E8F0",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#A20A3A",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  textName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  textID1: {
    fontSize: 15,
    color: "#989EB3",
    marginTop: 5,
  },
});

export default Password;
