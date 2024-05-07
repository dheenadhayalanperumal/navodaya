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

const Logo = require("../Image/Logo.png");

const chitdetails=[{Userid:1234567892,UserName:"dheena", Chitid:"100 days Loan Scheme",LoanAmount:1000,ChitStartdate:"2021-09-01",Chitstatus:"collect",DailyPay:10,TotalAmount:1000,ChitDuration:100,ChitEnddate:"2021-12-09"},
{Userid:2234567892,UserName:"siva", Chitid:"100 days Loan Scheme",LoanAmount:1000,ChitStartdate:"2021-09-01",Chitstatus:"collect",DailyPay:10,TotalAmount:1000,ChitDuration:100,ChitEnddate:"2021-12-09"},
{Userid:3234567892,UserName:"kumar", Chitid:"100 days Loan Scheme",LoanAmount:1000,ChitStartdate:"2021-09-01",Chitstatus:"collect",DailyPay:10,TotalAmount:1000,ChitDuration:100,ChitEnddate:"2021-12-09"},
{Userid:4234567892,UserName:"sathish", Chitid:"100 days Loan Scheme",LoanAmount:1000,ChitStartdate:"2021-09-01",Chitstatus:"collect",DailyPay:10,TotalAmount:1000,ChitDuration:100,ChitEnddate:"2021-12-09"},
{Userid:5234567892,UserName:"suresh", Chitid:"100 days Loan Scheme",LoanAmount:1000,ChitStartdate:"2021-09-01",Chitstatus:"collect",DailyPay:10,TotalAmount:1000,ChitDuration:100,ChitEnddate:"2021-12-09"},
{Userid:6234567892,UserName:"kumar", Chitid:"100 days Loan Scheme",LoanAmount:1000,ChitStartdate:"2021-09-01",Chitstatus:"collect",DailyPay:10,TotalAmount:1000,ChitDuration:100,ChitEnddate:"2021-12-09"},
{Userid:7234567892,UserName:"sathish", Chitid:"100 days Loan Scheme",LoanAmount:1000,ChitStartdate:"2021-09-01",Chitstatus:"collect",DailyPay:10,TotalAmount:1000,ChitDuration:100,ChitEnddate:"2021-12-09"},
{Userid:8234567892,UserName:"suresh", Chitid:"100 days Loan Scheme",LoanAmount:1000,ChitStartdate:"2021-09-01",Chitstatus:"collect",DailyPay:10,TotalAmount:1000,ChitDuration:100,ChitEnddate:"2021-12-09"},
{Userid:9234567892,UserName:"kumar", Chitid:"100 days Loan Scheme",LoanAmount:1000,ChitStartdate:"2021-09-01",Chitstatus:"collect",DailyPay:10,TotalAmount:1000,ChitDuration:100,ChitEnddate:"2021-12-09"},
{Userid:10234567892,UserName:"sathish", Chitid:"100 days Loan Scheme",LoanAmount:1000,ChitStartdate:"2021-09-01",Chitstatus:"collect",DailyPay:10,TotalAmount:1000,ChitDuration:100,ChitEnddate:"2021-12-09"}

];

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
    textAlign:"left",
    paddingLeft:16,

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
    borderRadius:5,
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
  RouteText:{
    width: '100%',
    height: 43,
borderRadius: 5,
    backgroundColor: "#F4F6F9",
    alignItems: "left",
    justifyContent: "center",
    marginTop: 12,
  
  }
});

const Home = ({ navigation }) => {
  // Destructure navigation from props
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Use the error variable here
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

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

      
      <ScrollView contentContainerStyle={styles.disp} showsVerticalScrollIndicator={false} >
      {chitdetails.map((item) => (
        <Product key={item.id} data={item} />
      ))}
    </ScrollView>
    </View>
  );
};

export default Home;
