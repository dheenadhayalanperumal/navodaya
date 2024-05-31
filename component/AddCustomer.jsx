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
  Platform,
  Switch,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from 'react-native-dropdown-select-list';

const Logo = require("../Image/Logo1.png");

const AddCustomer = () => {
  const navigation = useNavigation();
  const [routeData, setRouteData] = useState([]);
  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    dateOfBirth: new Date(),
    maritalStatus: "",
    relatives: "",
    vehicle: false,
    houseOwned: false,
    photo: '',
    fatherName: "",
    motherName: "",
    brotherName: "",
    sisterName: "",
  });

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || formData.dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setFormData({ ...formData, dateOfBirth: currentDate });
  };

  const toggleSwitch = (field) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled && result.assets) {
      setFormData({ ...formData, photo: result.assets[0].uri });
    }
  };

  const handleChangeText = (name, value) => {
    if ((name === 'mobile' || name === 'alternate_number') && value.length > 10) {
      alert('Mobile number should be 10 digits');
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const isAnyFieldEmpty = Object.values(formData).some(value => value === "");

    if (isAnyFieldEmpty) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await AsyncStorage.setItem("formData", JSON.stringify(formData));
      navigation.navigate("AddCustomer1");
    } catch (e) {
      console.error("Error saving data:", e);
    }
  };

  useEffect(() => {
    const getRouteData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();
      formData.append("staff_id", userId);
      formData.append("token", token);

      try {
        const response = await fetch("https://nmwinternet.com/staging/demo/admin/Api/root_ids", {
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
          body: formData,
        });
        const data = await response.json();
        const routeList = data.route.map(item => ({
          key: item.root_id,
          value: item.root_number,
        }));
        setRouteData(routeList);
      } catch (error) {
        setError(error);
      }
    };

    getRouteData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>

      <View style={styles.form}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              {[
                { label: "Customer name", name: "customer" },
                { label: "Initial", name: "initial" },
                { label: "TKT No", name: "TKTno" },
                { label: "Mobile Number", name: "mobile", keyboardType: "numeric" },
                { label: "Alternate number", name: "alternate_number", keyboardType: "numeric" },
                { label: "Chit Group", name: "chitGroup" },
                { label: "Profession / Business Owned", name: "profession" },
                { label: "Annual Income", name: "annualIncome", keyboardType: "numeric" },
                { label: "Relatives name & address", name: "relatives" },
                { label: "Father's Name", name: "fatherName" },
                { label: "Mother's Name", name: "motherName" },
                { label: "Brother's Name", name: "brotherName" },
                { label: "Sister's Name", name: "sisterName" },
              ].map(({ label, name, keyboardType }) => (
                <View key={name}>
                  <Text style={styles.text}>{label}</Text>
                  <TextInput
                    style={styles.input}
                    value={formData[name]}
                    keyboardType={keyboardType}
                    onChangeText={(text) => handleChangeText(name, text)}
                  />
                </View>
              ))}

              <Text style={styles.text}>Route ID</Text>
              <View style={[styles.dropdown,styles.maritalStatusDropdown]}>
                <SelectList
                boxStyles={styles.maritalStatusDropdownBox}
                  dropdownStyles={{ width: '100%' }}
                  setSelected={(val) => handleChangeText('route_no', val)}
                  data={routeData}
                />
              </View>

              <Text style={styles.text}>Date of Birth</Text>
              <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
                <Text>{formData.dateOfBirth.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.dateOfBirth}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDate}
                />
              )}

              <Text style={styles.text}>Marital Status</Text>
              <View style={[styles.dropdown, styles.maritalStatusDropdown]}>
                <SelectList
                  boxStyles={styles.maritalStatusDropdownBox}
                  dropdownStyles={{ width: '100%' }}
                  setSelected={(val) => handleChangeText('maritalStatus', val)}
                  data={[
                    { key: "single", value: "Single" },
                    { key: "married", value: "Married" },
                    { key: "divorced", value: "Divorced" },
                    { key: "widowed", value: "Widowed" },
                  ]}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>Vehicle Owned:</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#FFAA10" }}
                  thumbColor={formData.vehicle ? "#A20A3A" : "#f4f3f4"}
                  onValueChange={() => toggleSwitch('vehicle')}
                  value={formData.vehicle}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text>House Owned:</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#FFAA10" }}
                  thumbColor={formData.houseOwned ? "#A20A3A" : "#f4f3f4"}
                  onValueChange={() => toggleSwitch('houseOwned')}
                  value={formData.houseOwned}
                />
              </View>

              <Text style={styles.text}>Customer Photo</Text>
              <View style={styles.camera}>
                <Button
                  style={formData.photo ? styles.camButActive : styles.camBut}
                  onPress={takePicture}
                >
                  Take Picture
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <View style={styles.space}></View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
  space: { height: 100 },
  logo: { width: 148, height: 48, resizeMode: "contain" },
  header: { height: 88, width: "100%", paddingTop: 18, backgroundColor: "#A20A3A", justifyContent: "center", alignItems:"center" },
  form: { width: "90%", marginTop: 10 },
  text: { fontSize: 15, marginBottom: 10, color: "#4A516D" },
  input: { height: 43, borderWidth: 1, borderColor: "#E6E8F0", padding: 10, marginBottom: 20, borderRadius: 5 },
  button: { backgroundColor: "#A20A3A", borderRadius: 5, height: 48, justifyContent: "center", alignItems: "center", marginBottom: 20 },
  buttonText: { color: "#fff", fontSize: 20 },
  camera: { alignItems: "flex-start", padding: 5, borderWidth: 1, borderColor: "#E6E8F0", borderRadius: 5, marginBottom: 20 },
  camBut: { backgroundColor: "#E6E8F0", alignItems: "center", borderRadius: 5 },
  camButActive: { backgroundColor: "rgba(16, 158, 56, 0.2)", alignItems: "center", borderRadius: 5 },
  dropdown: { marginBottom: 20 },
  maritalStatusDropdown: { borderColor: "#A20A3A" },
  maritalStatusDropdownBox: { borderColor: "#E6E8F0" },
  datePicker: { height: 43, borderWidth: 0.5, borderColor: "#E6E8F0", padding: 10, marginBottom: 20, borderRadius: 5, justifyContent: "center" },
  switchContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
});

export default AddCustomer;
