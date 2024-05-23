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
import { useState , useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logo = require("../Image/empImg.png");

const Password = ({ navigation }) => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [staffId, setStaffId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const userToken = await AsyncStorage.getItem("token");
      setStaffId(userId);
      setToken(userToken);
    };

    fetchUserDetails();
  }, []);

  const handleSaveChanges = () => {
    if (password !== confirmPassword) {
      alert("Error New password and confirm password must be the same.");
      return;

    }
    else if(password.length < 6){
      alert("Error Password must be at least 6 characters long.");
      return;
    }
    
    else{
      const formData = new FormData();
      formData.append("staff_id", staffId);
      formData.append("token", token);
      formData.append("current_password", oldPassword);
      formData.append("password", password);
     

      fetch("https://nmwinternet.com/staging/demo/admin/Api/change_password", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
            console.log(Error);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response data:", data);
          if (data.status === true && data.password_changed===true) {
            alert("Success", "Password changed successfully.");
          } else {
            alert("Password change failed.");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
      
    }
  
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />

        <Text style={styles.textName}>Employee Profile</Text>
        <Text style={styles.textID1}>123456</Text>
      </View>

      <View style={styles.form}>
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
          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
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
