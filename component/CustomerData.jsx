import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";

const Logo = require("../Image/empImg.png");

const CustomerData = ({ route }) => {
  const { id } = route.params;
  const [userdata, setUserdata] = useState([]);
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        const formData = new FormData();
        formData.append("staff_id", userId);
        formData.append("token", token);
        formData.append("customer_id", id);
        const response = await fetch(
          "https://nmwinternet.com/staging/demo/admin/Api/get_customer",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();

        try {
          const data = JSON.parse(text);
          setUserdata(data.customer_details);
          console.log(userdata.shop_details);
        } catch (error) {
          console.error("Invalid JSON:", text);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.UserDatas}>
        <Image style={styles.logo} source={{ uri: userdata.customer_photo }} />
        <Text style={styles.Name}>{userdata.customer_name}</Text>
        <Text style={styles.Phone}>{userdata.mobile_no}</Text>
        <Text style={styles.profession}>{userdata.profession}</Text>
      </View>
      <View style={styles.tittle}>
        <Text style={styles.textTittle}>Customer Information</Text>
      </View>
      <View style={styles.subdata}>
        <Text style={styles.SubTittle}>Mobile Number</Text>
        <Text style={styles.Subdata}>{userdata.mobile_no}</Text>
      </View>
      <View style={styles.subdata}>
        <Text style={styles.SubTittle}>Chit Group</Text>
        <Text style={styles.Subdata}>{userdata.chit_group}</Text>
      </View>
      <View style={styles.subdata}>
        <Text style={styles.SubTittle}>TKT No</Text>
        <Text style={styles.Subdata}>{userdata.tkt_no}</Text>
      </View>
      <View style={styles.subdata}>
        <Text style={styles.SubTittle}>Date of Birth</Text>
        <Text style={styles.Subdata}>{userdata.mobile_no}</Text>
      </View>
      <View style={styles.subdata}>
        <Text style={styles.SubTittle}>Marital Status</Text>
        <Text style={styles.Subdata}>{userdata.marital_status}</Text>
      </View>
      <View style={styles.subdata}>
        <Text style={styles.SubTittle}>Vehicle Info</Text>
        <Text style={styles.Subdata}>{userdata.vehicle_info}</Text>
      </View>
      <View style={styles.subdata}>
        <Text style={styles.SubTittle}>Father Name</Text>
        <Text style={styles.Subdata}>{userdata.father_name}</Text>
      </View>
      <View style={styles.subdata}>
        <Text style={styles.SubTittle}>Mother Name</Text>
        <Text style={styles.Subdata}>{userdata.mother_name}</Text>
      </View>

      <View style={styles.tittle}>
        <Text style={styles.textTittle}>Address Information</Text>
      </View>
      <View style={styles.innerdata}>
        <Text style={styles.Subdata}>Chennai Address</Text>
        <View style={styles.subdatabox}>
          <Text style={styles.Subdata1}>
            {userdata.chennai_address_door_no},{" "}
            {userdata.chennai_address_street}
          </Text>
          <Text style={styles.Subdata1}>
            {userdata.chennai_address_landmark}
          </Text>
          <Text style={styles.Subdata1}>{userdata.chennai_address_area}</Text>
          <Text style={styles.Subdata1}>{userdata.chennai_address_city}</Text>
          <Text style={styles.Subdata1}>
            {userdata.chennai_address_pincode}
          </Text>
          <Text style={styles.Subdata1}>{userdata.chennai_address_state}</Text>
        </View>
      </View>

      <View style={styles.innerdata}>
        <Text style={styles.Subdata}>Native Address</Text>
        <View style={styles.subdatabox}>
          <Text style={styles.Subdata1}>
            {userdata.native_address_door_no}, {userdata.chennai_address_street}
          </Text>
          <Text style={styles.Subdata1}>
            {userdata.native_address_landmark}
          </Text>
          <Text style={styles.Subdata1}>{userdata.native_address_area}</Text>
          <Text style={styles.Subdata1}>{userdata.native_address_city}</Text>
          <Text style={styles.Subdata1}>{userdata.native_address_pincode}</Text>
          <Text style={styles.Subdata1}>{userdata.native_address_state}</Text>
        </View>
      </View>
      <View style={styles.innerdata}>
        <Text style={styles.Subdata}>Relative Info</Text>
        <View style={styles.SubReldata}>
          <Text style={styles.Subdata1}>{userdata.relative_info}</Text>
        </View>
      </View>

      <View style={styles.tittle}>
        <Text style={styles.textTittle}>Shop Address</Text>
      </View>
      <View style={styles.subdataboxDoc}>
      {
  userdata.shop_details && userdata.shop_details.shop_image ? // checks if `userdata.shop_details` and `userdata.shop_details.shop_image` exist
    <Image
      style={styles.document}
      source={{ uri: userdata.shop_details.shop_image }} // if it exists, use it as the source for the `Image` component
      onError={(error) => console.log(error)} // log any errors that occur while loading the image
    />
  : // else
    <Text style={styles.Subdata1}>No Image</Text> // render a `Text` component with the text "No Image"
}
      
      </View>

      <View style={styles.innerdata}>
  <View style={styles.subdatabox}>
    {userdata.shop_details ? (
      <>
        <Text style={styles.Subdata1}>
          {userdata.shop_details.door_no}, {userdata.shop_details.street}
        </Text>
        <Text style={styles.Subdata1}>
          {userdata.shop_details.landmark}
        </Text>
        <Text style={styles.Subdata1}>{userdata.shop_details.area}</Text>
        <Text style={styles.Subdata1}>{userdata.shop_details.city}</Text>
        <Text style={styles.Subdata1}>{userdata.shop_details.pincode}</Text>
        <Text style={styles.Subdata1}>{userdata.shop_details.state}</Text>
      </>
    ) : (
      <Text style={styles.Subdata1}>No Shop Details</Text>
    )}
  </View>
</View>

      <View style={styles.tittle1} >
        <Text style={styles.textTittle}>Documents</Text>
      </View>
      <View style={styles.subdataboxDoc}>
        <Image
          style={styles.document}
          source={{ uri: userdata.pan_card }}
          onError={(error) => console.log(error)}
        />
      </View>

      <View style={styles.innerdata}>
        
        <View style={styles.SubReldata}>
          <Text style={styles.Subdata1}>Aadhar Card - {userdata.aadhar_number}</Text>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    // justifyContent: "flex-start",
  },
  document: {
    width: "100%",
    height: "100%",
    borderRadius: 6,

    resizeMode: "cover",
  },
  subdataboxDoc: {
    backgroundColor: "#F4F6F9",
    height: 197,
    justifyContent: "center",
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 6,
  },
  innerdata: {
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 12,
  },
  subdatabox: {
    backgroundColor: "#F4F6F9",
    height: 150,
    width: "100%",
    justifyContent: "center",
    paddingLeft: 16,
    marginTop: 8,
    borderRadius: 6,
  },

  SubReldata: {
    backgroundColor: "#F4F6F9",
    height: 45,
    width: "100%",
    justifyContent: "center",
    paddingLeft: 16,
    marginTop: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  UserDatas: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 233,
    width: "100%",
    backgroundColor: "#303651",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 5,
    resizeMode: "cover",
  },
  Name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 12,
  },
  Phone: {
    fontSize: 16,
    color: "#697089",
    marginTop: 8,
  },
  profession: {
    fontSize: 12,
    color: "#697089",
    marginTop: 4,
  },
  picture: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 12,
  },
  tittle1: {
    fontSize: 16,
    justifyContent: "center",
    width: "100%",
    height: 43,
    paddingLeft: 16,
    backgroundColor: "#F4F6F9",
    marginTop: 12,
  },
  tittle: {
    fontSize: 16,
    justifyContent: "center",
    width: "100%",
    height: 43,
    paddingLeft: 16,
    backgroundColor: "#F4F6F9",
  },
  textTittle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#303651",
  },
  subdata: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: 54,
    paddingLeft: 16,
  },
  SubTittle: {
    fontSize: 12,
    color: "#697089",
  },
  Subdata: {
    fontSize: 16,
    color: "#303651",
  },
  Subdata1: {
    fontSize: 14,
    color: "#697089",
  },
});

export default CustomerData;
