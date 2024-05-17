import react from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const ShopAddress = () => {
  const navigation = useNavigation();
  const [ShopAddress, setShopAddress] = useState({
    doorno: "",
    street: "",
    landmark: "",
    area: "",
    city: "",
    pincode: "",
    state: "",
    shopPhoto: "",
  });
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.cancelled && result.assets) {
      setFormData((prevState) => ({
        ...prevState,
        photo: result.assets[0].uri,
      }));
    }
  };

  const handleChangeText = (name, value) => {
    setLocalAddress({ ...LocalAddress, [name]: value });
  };

  const handleSave = () => {
    // alert("Data Saved", ShopAddress);
    console.log(ShopAddress);
    navigation.navigate("OtherDocuments");
    // console.log(formData);
  };

  const handlePrevious = () => {
    navigation.navigate("AddCustomer1");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.Local}>
        <View style={styles.Lname}>
          <Text style={styles.textName}>Shop Address</Text>
        </View>

        <View style={styles.address}>
          <Text style={styles.text}>Door No</Text>
          <TextInput
            style={styles.input}
            value={ShopAddress.doorno}
            onChangeText={(text) => handleChangeText("doorno", text)}
          />

          <Text style={styles.text}>Street</Text>
          <TextInput
            style={styles.input}
            value={ShopAddress.street}
            onChangeText={(text) => handleChangeText("street", text)}
          />
          <Text style={styles.text}>Land Mark</Text>
          <TextInput
            style={styles.input}
            value={ShopAddress.landmark}
            onChangeText={(text) => handleChangeText("landmark", text)}
          />
          <Text style={styles.text}>Area</Text>
          <TextInput
            style={styles.input}
            value={ShopAddress.area}
            onChangeText={(text) => handleChangeText("area", text)}
          />

          <Text style={styles.text}>City</Text>
          <TextInput
            style={styles.input}
            value={ShopAddress.city}
            onChangeText={(text) => handleChangeText("city", text)}
          />
          <Text style={styles.text}>Pincode</Text>
          <TextInput
            style={styles.input}
            value={ShopAddress.pincode}
            onChangeText={(text) => handleChangeText("pincode", text)}
          />

          <Text style={styles.text}>State</Text>
          <TextInput
            style={styles.input}
            value={ShopAddress.state}
            onChangeText={(text) => handleChangeText("state", text)}
          />

          <Text style={styles.text}>Shop Photo</Text>

          <View style={styles.camera}>
            <Button
              style={styles.camBut}
              onPress={takePicture}
            >
              Take Picture
            </Button>
          </View>
        </View>

        <View style={styles.buttonarrange}>
          <View>
            <TouchableOpacity style={styles.button} onPress={handlePrevious}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  buttonarrange: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 20,
  },
  Lname: {
    height: 48,
    width: "100%",
    backgroundColor: "#F4F6F9",
    justifyContent: "center",
    paddingLeft: 16,
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
    color: "#4A516D",
  },
  input: {
    height: 43,
    borderWidth: 1,
    borderColor: "#E6E8F0",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    width: 160,
    backgroundColor: "#A20A3A",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  address: {
    flexDirection: "column",
    padding: 16,
  },

  local: {
    showsVerticalScrollIndicator: false,
  },
  perment: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  camBut: {
    backgroundColor: "#E6E8F0",
    alignItems: "center",
    borderRadius: 5,
  },
  camera: {
    alignItems: "flex-start",
    padding: 5,
    borderWidth: 1,
    borderColor: "#E6E8F0",
    borderRadius: 5,
  },
});

export default ShopAddress;
