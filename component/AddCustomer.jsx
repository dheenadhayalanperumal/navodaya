import React, { useState, useEffect } from "react";
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
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { SelectList } from 'react-native-dropdown-select-list'

const Logo = require("../Image/Logo1.png");

const AddCustomer = () => {
  const navigation = useNavigation();

  const [route_data, setroute_data] = useState({});
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    customer: "",
    initial: "",

    route_no: "",
    TKTno: "",
    mobile: "",
    alternate_number: "",
    chitGroup: "",
    profession: "",
    annualIncome: "",
    dateOfBirth: "",
    maritalStatus: "",
    relatives: "",
    vehicle: "",
    house: "",
    // property: "",
    photo:'',
    fatherName: "",
    motherName: "",
    brotherName: "",
    sisterName: "",

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
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {

    const isAnyFieldEmpty = Object.values(formData).some(value => value === "");

    if (isAnyFieldEmpty) {
      // Display error message
      alert("Please fill in all fields.");
    }else{

      try {
        await AsyncStorage.setItem("formData", JSON.stringify(formData));
  
        // console.log(formData);
        navigation.navigate("AddCustomer1");
        // console.log(value);
      } catch (e) {
        // saving error
        console.error("Error saving data:", e);
      }

    } 

   
  };

  useEffect(() => {
    const get_route_data = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
  
      const formData = new FormData();
      formData.append("staff_id", userId);
      formData.append("token", token);
  
      fetch("https://nmwinternet.com/staging/demo/admin/Api/root_ids", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        // setroute_data(data.route[0].route_id);
        const fetchData= data.route.map((item) => (
          {
            key: item.root_id,
            value: item.root_number,
          }
        )
        );
        console.log(fetchData);
        setroute_data(fetchData);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      }); 
    }
  
    get_route_data();
  }, []);

 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>

      <View style={styles.form}>
        <ScrollView
          contentContainerStyle={{ justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View>
              <Text style={styles.text}>Customer name</Text>
              <TextInput
                style={styles.input}
                value={formData.customer}
                onChangeText={(text) => handleChangeText("customer", text)}
              />

              <Text style={styles.text}>Initial</Text>
              <TextInput
                style={styles.input}
                value={formData.initial}
                onChangeText={(text) => handleChangeText("initial", text)}
              />
              {/* <Text style={styles.text}>Customer ID</Text>
              <TextInput
                style={styles.input}
                value={formData.customerId}
                onChangeText={(text) => handleChangeText("customerId", text)}
              /> */}

              <Text style={styles.text}>Route ID</Text>
              <View style={styles.dropdown}>
              <SelectList 
              dropdownStyles={{ width: '100%'}}
                setSelected={(val) => handleChangeText('route_no', val)}
                data={route_data}

              />
              </View>


              <Text style={styles.text}>TKT No</Text>
              <TextInput
                style={styles.input}
                value={formData.TKTno}
                onChangeText={(text) => handleChangeText("TKTno", text)}
              />

              <Text style={styles.text}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                value={formData.mobile}
                keyboardType="numeric"
                onChangeText={(text) => handleChangeText("mobile", text)}
              />

<Text style={styles.text}>alternate number</Text>
              <TextInput
                style={styles.input}
                value={formData.alternate_number}
                keyboardType="numeric"
                onChangeText={(text) => handleChangeText("alternate_number", text)}
              />

              <Text style={styles.text}>Chit Group</Text>
              <TextInput
                style={styles.input}
                value={formData.chitGroup}
                onChangeText={(text) => handleChangeText("chitGroup", text)}
              />
              <Text style={styles.text}>Profession / Business Owned</Text>
              <TextInput
                style={styles.input}
                value={formData.profession}
                onChangeText={(text) => handleChangeText("profession", text)}
              />

              <Text style={styles.text}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                value={formData.dateofBirth}
                onChangeText={(text) => handleChangeText("dateOfBirth", text)}
              />


              <Text style={styles.text}>Annual Income</Text>
              <TextInput
                style={styles.input}
                value={formData.annualIncome}
                keyboardType="numeric"
                onChangeText={(text) => handleChangeText("annualIncome", text)}
              />

              <Text style={styles.text}>Marital Status</Text>
              <TextInput
                style={styles.input}
                value={formData.maritalStatus}
                onChangeText={(text) => handleChangeText("maritalStatus", text)}
              />

              

              <Text style={styles.text}>Relatives name & address</Text>
              <TextInput
                style={styles.input}
                value={formData.relatives}
                onChangeText={(text) => handleChangeText("relatives", text)}
              />

              <Text style={styles.text}>Vechicle Owned</Text>
              <TextInput
                style={styles.input}
                value={formData.vehicle}
                onChangeText={(text) => handleChangeText("vehicle", text)}
              />

              <Text style={styles.text}>House Owned</Text>
              <TextInput
                style={styles.input}
                value={formData.house}
                onChangeText={(text) => handleChangeText("house", text)}
              />

              {/* <Text style={styles.text}>
                Property Owned House/Flat/Land etc
              </Text>
              <TextInput
                style={styles.input}
                value={formData.property}
                onChangeText={(text) => handleChangeText("property", text)}
              /> */}

              <Text style={ styles.text}>Customer Photo</Text>

              <View style={styles.camera}>
                <Button
                  style={formData.photo ? styles.camBut1 :  styles.camBut}
                  onPress={takePicture}
                >
                  Take Picture
                </Button>
              </View>

              <Text style={styles.text}>Father's Name</Text>
              <TextInput
                style={styles.input}
                value={formData.fatherName}
                onChangeText={(text) => handleChangeText("fatherName", text)}
              />

              <Text style={styles.text}>Mother's Name</Text>
              <TextInput
                style={styles.input}
                value={formData.motherName}
                onChangeText={(text) => handleChangeText("motherName", text)}
              />

              <Text style={styles.text}>Brother's Name</Text>
              <TextInput
                style={styles.input}
                value={formData.brotherName}
                onChangeText={(text) => handleChangeText("brotherName", text)}
              />

              <Text style={styles.text}>Sister's Name</Text>
              <TextInput
                style={styles.input}
                value={formData.sisterName}
                onChangeText={(text) => handleChangeText("sisterName", text)}
              />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space}></View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  space: {
    height: 100,
  },

  logo: {
    width: 148,
    height: 48,
    margintop: 5,
    resizeMode: "contain",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    height: 88,
    width: "100%",
    padding: 24,
    backgroundColor: "#A20A3A",
  },
  form: {
    flexDirection: "column",
    justifyContent: "center",
    width: "90%",
    marginTop: 10,
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
    backgroundColor: "#A20A3A",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  button1: {
    backgroundColor: "#fff",
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
  camera: {
    alignItems: "flex-start",
    padding: 5,
    borderWidth: 1,
    borderColor: "#E6E8F0",
    borderRadius: 5,
    marginBottom: 20,
  },
  camBut: {
    backgroundColor: "#E6E8F0",
    alignItems: "center",
    borderRadius: 5,

  },
  camBut1: {
    backgroundColor:"rgba(16, 158, 56, 0.2)",
    alignItems: "center",
    borderRadius: 5,

  },
  dropdown: {
    marginBottom: 20,
  },

});

export default AddCustomer;
