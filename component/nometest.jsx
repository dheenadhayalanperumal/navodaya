import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Product from "./Product";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logo = require("../Image/Logo1.png");




const userId= AsyncStorage.getItem("userId");
const token= AsyncStorage.getItem("token");

const Home = ({ navigation }) => {
  // Destructure navigation from props
  const [routeData, setRouteData] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();
      formData.append("staff_id", userId);
      formData.append("token", token);

      fetch("https://nmwinternet.com/staging/demo/admin/Api/today_shedule", {
        method: "POST",
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        let newRouteData = {};
        data.route.forEach((route, index) => {
          newRouteData[`route${index}`] = route.route_id;
        });
        setRouteData(newRouteData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>
      {/* <Image style={styles.logo} source={Logo} /> */}
      <View style={styles.SearchInput}>
        <TextInput style={styles.Searchtext} placeholder="Enter User ID" />

        <TouchableOpacity
          style={styles.SearchButton}
          onPress={() => alert("Search")}
        >
          <Text style={styles.ButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.RouteText}>
        <Text style={styles.text1}>Route 05 List</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.disp}
        showsVerticalScrollIndicator={false}
      >
       {Object.entries(routeData).map(([route, routeId], index) => (
  <View key={index}>
    <Text style={styles.routeTitle}>Route: {route}</Text>
    <Text style={styles.routeDetails}>Route ID: {routeId}</Text>
    {routeId.map((item, index) => (
      <Product key={index} data={item} />
    ))}
      </View>
    ))}

        {/* {routeData.map((item, index) => (
          <Product key={index} data={item} />
        ))} */}
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
  header: {
    flexDirection: "row",
    justifyContent: "center",
    height: 88,
    width: "100%",
    padding: 24,
    backgroundColor: "#A20A3A",
  },
  disp: {
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  text: {
    fontSize: 20,
    color: "#000",
    margin: 5,
  },
  text1: {
    fontSize: 20,
    color: "#A20A3A",
    textAlign: "left",
    paddingLeft: 32,
  },
  logo: {
    width: 148,
    height: 48,
    margin: 5,
    resizeMode: "contain",
  },
  SearchInput: {
    flexDirection: "row",
    height: 41,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  Searchtext: {
    height: 41,
    width: 233,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: 16,
  },
  SearchButton: {
    height: 41,
    width: 79,
    backgroundColor: "#FFAA10",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 16,
  },
  ButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
  RouteText: {
    width: "100%",
    height: 43,
    borderRadius: 5,
    backgroundColor: "#F4F6F9",
    alignItems: "left",
    justifyContent: "center",
    marginTop: 12,
  },
});


export default Home;
