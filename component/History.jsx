import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Collection from "./Collection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Logo = require("../Image/Logo1.png");
const but = require("../Image/EmButton.png");




const History = () => {
  const navigation = useNavigation();
const [data , setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [collect , setCollect] = useState([]);
const [target , setTarget] = useState([]);
const [username , setUsername] = useState([]);
const [id , setId] = useState([]);



useFocusEffect(
  useCallback(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        const name = await AsyncStorage.getItem("userName");
        
        setUsername(name);
        setId(userId);


        const formData = new FormData();
        formData.append("staff_id", userId);
        formData.append("token", token);

        const response = await fetch("https://nmwinternet.com/staging/demo/admin/Api/get_collcetion_details", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setData(data.loan_details);
        setCollect(data.collected);
        setTarget(data.target_amount);
        //  console.log("Data:", data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
 
if(!data){
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <View style={styles.EmProfile}>
        <View>
          <Text style={styles.textName}>{username}</Text>
          <Text style={styles.textID1}>Staff ID: {id}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Password")}>
          <View>
            <Image style={styles.Empbut} source={but} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.nodata}>No Data Found or No Amount Collected</Text>
    </View>
  );
}


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>

      <View style={styles.EmProfile}>
        <View>
          <Text style={styles.textName}>{username}</Text>
          <Text style={styles.textID1}>Staff ID: {id}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Password")}>
          <View>
            <Image style={styles.Empbut} source={but} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.PaymentBoxHead}>
        <View style={styles.PaymentBox}>
          <Text style={styles.datatext}>Collected Amount</Text>
          <Text style={styles.text}>&#8377; {collect}</Text>
        </View>
        <View style={styles.PaymentBox}>
          <Text style={styles.datatext}>Target Amount</Text>
          <Text style={styles.text}> &#8377; {target}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.disp}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <Collection key={index} data={item} />
        ))}
      </ScrollView>
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
  nodata: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding:16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    height: 88,
    width: "100%",
    padding: 24,
    backgroundColor: "#A20A3A",
  },
  PaymentBoxHead: {
    width: 328, // Increase width
    height: 70, // Increase height
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  EmProfile: {
    width: 328, // Increase width
    height: 80, // Increase height
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    padding: 16,
    borderRadius: 5,
    backgroundColor: "#303651",
  },
  textName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  textID1: {
    fontSize: 13,
    color: "#989EB3",
    marginTop: 5,
  },

  PaymentBox: {
    width: 156, // Increase width
    height: 70, // Increase height
    borderColor: "#E6E8F0",
    borderWidth: 0.5,
    backgroundColor: "#F4F6F9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "column",
  },
  text: {
    fontSize: 15,
    color: "#4A516D",
    fontWeight: "bold",
  },
  datatext: {
    color: "#697089",
    fontSize: 12,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chitmaindata: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  chitdata: {
    alignItems: "center",
  },

  Totaltext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  Buttontext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chitbasedata: {
    padding: 20,
  },
  chitbasetext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: 148,
    height: 48,
    margin: 5,
    resizeMode: "contain",
  },
 load:{
  alignItems:"center",
  justifyContent:"center",
  fontSize:20,
  textAlign:"center",
  marginTop:"70%",
 },
 loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});

export default History;