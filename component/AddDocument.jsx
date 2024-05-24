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
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const AddDocument = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

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

  const takePicture = async (type_photo) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled && result.assets) {
      let photo_type = type_photo;
      setOtherDocument((prevState) => ({
        ...prevState,
        [photo_type]: result.assets[0].uri,
      }));
    }
  };

  const handleChangeText = (name, value) => {
    setOtherDocument({ ...OtherDocument, [name]: value });
  };

  const handleSave = async () => {
    // alert("Data Saved", OtherDocument);
    // setLoading(true);

    const isAnyFieldEmpty = Object.values(OtherDocument).some(
      (value) => value === ""
    );

    if (isAnyFieldEmpty) {
      // Display error message
      alert("Please fill in all fields.");
    } else {
      try {
        // await AsyncStorage.setItem("OtherDocument", JSON.stringify(OtherDocument));

        const keys = await AsyncStorage.getAllKeys();

        const basic_details = await AsyncStorage.getItem("formData");

        const converted = JSON.parse(basic_details);

        const local_adress = await AsyncStorage.getItem("local_Adress");

        const converted_local_adress = JSON.parse(local_adress);

        const perment_adress = await AsyncStorage.getItem("PermanentAddress");

        const converted_perment_adress = JSON.parse(perment_adress);

        const shop_adress = await AsyncStorage.getItem("ShopAddress");

        const converted_shop_adress = JSON.parse(shop_adress);

        const otdoc = OtherDocument;

        // const converted_OtherDocument=JSON.parse(OtherDocument)

        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        const formData = new FormData();

        // formData.append("token", "dsadsdssa");

        console.log(token);

        formData.append("staff_id", userId);
        formData.append("token", token);
        formData.append("customer_name", converted.customer);
        formData.append("initial", converted.initial);
        formData.append("route_id", converted.route_no);
        formData.append("tkt_no", converted.TKTno);
        formData.append("mobile_number", converted.mobile);
        formData.append("alternate_number[]", converted.alternate_number);

        formData.append("chit_group[]", converted.chitGroup);
        formData.append("annual_income", converted.annualIncome);
        formData.append("profession", converted.profession);
        formData.append("date_of_birth", converted.dateOfBirth);
        formData.append("marital_status", converted.maritalStatus);
        formData.append(
          "relative_name_adress_phone_number",
          converted.relatives
        );
        formData.append("vehicies_owned", converted.vehicle);
        formData.append("father_name", converted.fatherName);
        formData.append("mother_name", converted.motherName);
        formData.append("brother_name", converted.brotherName);
        formData.append("sister_name", converted.sisterName);

        formData.append("chennai_door_number", converted_local_adress.doorno);
        formData.append("chennai_street", converted_local_adress.street);
        formData.append("chennai_land_mark", converted_local_adress.landmark);
        formData.append("chennai_area", converted_local_adress.area);
        formData.append("chennai_city", converted_local_adress.city);
        formData.append("chennai_pincode", converted_local_adress.pincode);
        formData.append("chennai_state", converted_local_adress.state);

        formData.append("native_door_number", converted_perment_adress.doorno);
        formData.append("native_street", converted_perment_adress.street);
        formData.append("native_land_mark", converted_perment_adress.landmark);
        formData.append("native_area", converted_perment_adress.area);
        formData.append("native_city", converted_perment_adress.city);
        formData.append("native_pincode", converted_perment_adress.pincode);
        formData.append("native_state", converted_perment_adress.state);

        formData.append("shop_door_number[]", converted_shop_adress.doorno);
        formData.append("shop_street[]", converted_shop_adress.street);
        formData.append("shop_landmark[]", converted_shop_adress.landmark);
        formData.append("shop_area[]", converted_shop_adress.area);
        formData.append("shop_city[]", converted_shop_adress.city);
        formData.append("shop_pincode[]", converted_shop_adress.pincode);
        formData.append("shop_state[]", converted_shop_adress.state);

        formData.append("aadhar_card_number", otdoc.AadharNumber);
        formData.append("pan_card_number", otdoc.PanNumber);
        formData.append("voter_id_number", otdoc.VoterNumber);
        formData.append("driving_license_number", otdoc.DrivingNumber);

        formData.append("customer_photo", {
          uri: converted.photo,
          name: `${Math.random().toString(36).substring(7)}.jpg`,
          type: "image/jpeg",
        });
        formData.append("shop_photo[]", {
          uri: converted_shop_adress.shopPhoto,
          name: `${Math.random().toString(36).substring(7)}.jpg`,
          type: "image/jpeg",
        });
        formData.append("aadhar_card_img", {
          uri: otdoc.Aadharphoto,
          name: `${Math.random().toString(36).substring(7)}.jpg`,
          type: "image/jpeg",
        });

        formData.append("pan_card_img", {
          uri: otdoc.PanPhoto,
          name: `${Math.random().toString(36).substring(7)}.jpg`,
          type: "image/jpeg",
        });

        formData.append("voter_id_img", {
          uri: otdoc.Voterphoto,
          name: `${Math.random().toString(36).substring(7)}.jpg`,
          type: "image/jpeg",
        });
        formData.append("driving_license_img", {
          uri: otdoc.Drivingphoto,
          name: `${Math.random().toString(36).substring(7)}.jpg`,
          type: "image/jpeg",
        });
        formData.append("employment_id", {
          uri: otdoc.Employmentphoto,
          name: `${Math.random().toString(36).substring(7)}.jpg`,
          type: "image/jpeg",
        });
        formData.append("ration_card_img", {
          uri: otdoc.Rationphoto,
          name: `${Math.random().toString(36).substring(7)}.jpg`,
          type: "image/jpeg",
        });

        formData.append("any_other_id", {
          uri: otdoc.AnyotherIdphoto,
          name: `${Math.random().toString(36).substring(7)}.jpg`,
          type: "image/jpeg",
        });
        formData.append("other_document", {
          uri: otdoc.OtherDocumentsphoto,
          name: `${Math.random().toString(36).substring(7)}.jpg`,
          type: "image/jpeg",
        });

        setLoading(true);
        
        fetch ("https://nmwinternet.com/staging/demo/admin/Api/add_customer", {
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
          body: formData,
        })
        
          .then((response) => {
            
            console.log(response.data);
            setLoading(false);
            navigation.navigate("Succuss");
            // Handle successful response
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
            // Handle errors
          });
      } catch (e) {
        // saving error
        console.error("Error saving data:", e);
      }
    }

    // console.log(formData);
  };

  const handlePrevious = () => {
    navigation.navigate("ShopAddress");
  };



  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.load}>Loading...</Text>
      </View>
    );
  }

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
              style={ OtherDocument.Aadharphoto ? styles.camBut1 : styles.camBut}
              onPress={() => takePicture("Aadharphoto")}
            >
              Take Picture
            </Button>
          </View>

          <Text style={styles.text}>Adhar card Number</Text>
          <TextInput
            style={styles.input}
            value={OtherDocument.AadharNumber}
            keyboardType="numeric"
            onChangeText={(text) => handleChangeText("AadharNumber", text)}
          />
          <Text style={styles.text}>Pan card Photo</Text>

          <View style={styles.camera}>
            <Button
              style={ OtherDocument.PanPhoto ? styles.camBut1 : styles.camBut}
              onPress={() => takePicture("PanPhoto")}
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
              style={ OtherDocument.Voterphoto ? styles.camBut1 : styles.camBut}
              onPress={() => takePicture("Voterphoto")}
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
              style={ OtherDocument.Drivingphoto ? styles.camBut1 : styles.camBut}
              onPress={() => takePicture("Drivingphoto")}
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
              style={ OtherDocument.Employmentphoto ? styles.camBut1 : styles.camBut}
              onPress={() => takePicture("Employmentphoto")}
            >
              Take Picture
            </Button>
          </View>
          <Text style={styles.text}>Ration Card Photo</Text>

          <View style={styles.camera}>
            <Button
              style={ OtherDocument.Rationphoto ? styles.camBut1 : styles.camBut}
              onPress={() => takePicture("Rationphoto")}
            >
              Take Picture
            </Button>
          </View>
          <Text style={styles.text}>Any other ID Photo</Text>

          <View style={styles.camera}>
            <Button
              style={ OtherDocument.AnyotherIdphoto ? styles.camBut1 : styles.camBut}
              onPress={() => takePicture("AnyotherIdphoto")}
            >
              Take Picture
            </Button>
          </View>

          <Text style={styles.text}>Any other Documents photo</Text>

          <View style={styles.camera}>
            <Button
              style={ OtherDocument.OtherDocumentsphoto ? styles.camBut1 : styles.camBut}
              onPress={() => takePicture("OtherDocumentsphoto")}
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
  camBut1: {
    backgroundColor: "rgba(16, 158, 56, 0.2)",
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
  load:{
    alignItems:"center",
    justifyContent:"center",
    fontSize:20,
    textAlign:"center",
    marginTop:"70%",
   },
});

export default AddDocument;
