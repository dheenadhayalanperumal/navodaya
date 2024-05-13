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
import { useNavigation } from "@react-navigation/native";   

const AddCustomer1 = () => {
    const navigation = useNavigation();
  const [LocalAddress, setLocalAddress] = useState({
    doorno: "",
    street: "",
    landmark: "",
    area: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handleChangeText = (name, value) => {
    setLocalAddress({ ...LocalAddress, [name]: value });
  };

  const handleSave = () => {
    alert("Data Saved", LocalAddress);
    // console.log(formData);
  };

    const handlePrevious = () => {

    navigation.navigate('AddCustomer');
    };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.Local}>
        <View style={styles.Lname}>
          <Text style={styles.textName}>Local Address</Text>
        </View>

        <View style={styles.address}>
          <Text style={styles.text}>Door No</Text>
          <TextInput
            style={styles.input}
            value={LocalAddress.doorno}
            onChangeText={(text) => handleChangeText("doorno", text)}
          />

          <Text style={styles.text}>Street</Text>
          <TextInput
            style={styles.input}
            value={LocalAddress.street}
            onChangeText={(text) => handleChangeText("street", text)}
          />
          <Text style={styles.text}>Land Mark</Text>
          <TextInput
            style={styles.input}
            value={LocalAddress.landmark}
            onChangeText={(text) => handleChangeText("landmark", text)}
          />
          <Text style={styles.text}>Area</Text>
          <TextInput
            style={styles.input}
            value={LocalAddress.area}
            onChangeText={(text) => handleChangeText("area", text)}
          />

          <Text style={styles.text}>City</Text>
          <TextInput
            style={styles.input}
            value={LocalAddress.city}
            onChangeText={(text) => handleChangeText("city", text)}
          />
          <Text style={styles.text}>Pincode</Text>
          <TextInput
            style={styles.input}
            value={LocalAddress.pincode}
            onChangeText={(text) => handleChangeText("pincode", text)}
          />

          <Text style={styles.text}>State</Text>
          <TextInput
            style={styles.input}
            value={LocalAddress.state}
            onChangeText={(text) => handleChangeText("state", text)}
          />
        </View>
        <View style={styles.buttonarrange}>
        <View>
          <TouchableOpacity style={styles.button} onPress={handlePrevious}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        </View>
<View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save & Next</Text>
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
    width: 165,
    backgroundColor: "#A20A3A",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 16,
    marginLeft: 16,
    
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
});

export default AddCustomer1;
