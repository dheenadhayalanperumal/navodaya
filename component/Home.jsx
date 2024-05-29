import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "./Product";
import { useFocusEffect } from "@react-navigation/native";


const Logo = require("../Image/Logo1.png");

const Home = ({ navigation }) => {
  const [routeData, setRouteData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerId, setCustomerId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error1, setError1] = useState(null);
 


  useFocusEffect(
  useCallback(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        const formData = new FormData();
        formData.append("staff_id", userId);
        formData.append("token", token);

        const response = await fetch("https://nmwinternet.com/staging/demo/admin/Api/today_shedule", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if(data.route){
          setRouteData(data.route.route_id);
        }
        else{
          setRouteData(null);
        }
        // data.route ? setRouteData(data.route.route_id) : setRouteData(null); 
        // setRouteData(data.route.route_id);
         console.log("Data:", routeData);
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


  const searchByCustomerId = () => {
    const searchUserDetails = (customerId) => {
      if (!routeData) {
        return null;
      }
      for (const routeKey in routeData) {
        const loans = routeData[routeKey];
        for (const loan of loans) {
          if (loan.customer_id === customerId) {
            return loan;
          }
        }
      }
      return null; // Return null if not found
    };

    const result = searchUserDetails(customerId);
    if (result) {
      setSearchResult(result);
      setError1(null);
      // alert("Customer ID found");
      console.log("Customer ID found");
    } else {
      setSearchResult(null);
      setError1("Customer ID not found");
      alert("Customer ID not found");
    }
    setCustomerId("");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.load}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={Logo} />
        </View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if(!routeData){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={Logo} />
        </View>
        <Text style={styles.nodata}>No Data Found or All Amount are collected</Text>
      </View>
    );
  }


  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>
      {/* <LoanSearchApp data={routeData}/> */}

      <View style={styles.SearchInput}>
        <TextInput style={styles.Searchtext} value={customerId}
          onChangeText={setCustomerId} placeholder="Enter User ID" />
        <TouchableOpacity
          style={styles.SearchButton}
          onPress={searchByCustomerId}
        >
          <Text style={styles.ButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {searchResult && (

        <Product data={searchResult} />
      )}

      {/* {error1 && <Text style={styles.error}>{error1}</Text>} */}

      
      <FlatList
       showsVerticalScrollIndicator={false}

       
        data={Object.keys(routeData)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <View style={styles.RouteText}>
        <Text style={styles.text1}>Route ID: {item}</Text>
      </View>
            {/* <Text>Route ID: {item}</Text> */}
            {routeData[item].map((entry, index) => (
              <Product key={index} data={entry} />
          
            ))}
          </View>
        )}
      />
    </View>
    </TouchableWithoutFeedback>
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
    textAlign: "center",
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
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 12,
    paddingLeft: 32,
  },
  text1: {
    fontSize: 20,
    color: "#A20A3A",
  },
  entryContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  load:{
    alignItems:"center",
    justifyContent:"center",
    fontSize:20,
    textAlign:"center",
    marginTop:"70%",
   },
});

export default Home;
