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

const AddDocument = () => {
  const navigation = useNavigation();
  const [OtherDocument, setOtherDocument] = useState({
    Aadharphoto: "",
    AadharNumber: "",
    PanPhoto: "",
    PanNumber: "",
    Voterphoto: "",
    VoterNumber: "",
    Drivingphoto: "",
    DrivingNumber: "",
    Employmentphoto: "",
    Rationphoto: "",
    AnyotherIdphoto: "",
    OtherDocumentsphoto: "",
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
    alert("Data Saved", OtherDocument);
    console.log(OtherDocument);
    // console.log(formData);
  };

  const handlePrevious = () => {
    navigation.navigate("ShopAddress");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.Local}>
        <View style={styles.Lname}>
          <Text style={styles.textName}>Other Documents Address</Text>
        </View>

        <View style={styles.address}>
          <Text style={styles.text}>Adhar card Photo</Text>

          <View style={styles.camera}>
            <Button
              style={styles.camBut}
              onPress={takePicture}
            >
              Take Picture
            </Button>
          </View>

          <Text style={styles.text}>Adhar card Number</Text>
          <TextInput
            style={styles.input}
            value={OtherDocument.AadharNumber}
            onChangeText={(text) => handleChangeText("AadharNumber", text)}
          />
          <Text style={styles.text}>Pan card Photo</Text>

          <View style={styles.camera}>
          <Button
              style={styles.camBut}
              onPress={takePicture}
            >
              Take Picture
            </Button>
          </View>

          <Text style={styles.text}>Pan card Number</Text>
          <TextInput
            style={styles.input}
            value={OtherDocument.PanNumber}
            onChangeText={(text) => handleChangeText("PanNumber", text)}
          />
          <Text style={styles.text}>Voter ID Photo</Text>

          <View style={styles.camera}>
          <Button
              style={styles.camBut}
              onPress={takePicture}
            >
              Take Picture
            
            </Button>

            </View>
          <Text style={styles.text}>Voter ID Number</Text>
          <TextInput
            style={styles.input}
            value={OtherDocument.VoterNumber}
            onChangeText={(text) => handleChangeText("VoterNumber", text)}
          />
          <Text style={styles.text}>Driving License Photo</Text>

          <View style={styles.camera}>
          <Button
              style={styles.camBut}
              onPress={takePicture}
            >
              Take Picture
            </Button>
            </View>
          <Text style={styles.text}>Driving License Number</Text>
          <TextInput
            style={styles.input}
            value={OtherDocument.DrivingNumber}
            onChangeText={(text) => handleChangeText("DrivingNumber", text)}
          />
          <Text style={styles.text}>Employment ID Photo</Text>

          <View style={styles.camera}>
          <Button
              style={styles.camBut}
              onPress={takePicture}
            >
              Take Picture
            </Button>
            </View>
          <Text style={styles.text}>Ration Card Photo</Text>

          <View style={styles.camera}>
          <Button
              style={styles.camBut}
              onPress={takePicture}
            >
              Take Picture
            </Button>
            </View>
          <Text style={styles.text}>Any other ID Photo</Text>

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
              <Text style={styles.buttonText}>Save</Text>
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
    marginBottom: 20,
  },
});

export default AddDocument;
