import React from "react";
import { View, Text, StyleSheet,ScrollView ,Image,TouchableOpacity} from "react-native";
import { useState } from "react";
import Product from "./Product";
const Logo = require("../Image/Logo1.png");
const but = require("../Image/EmButton.png");
import { useNavigation } from "@react-navigation/native";



const History = ({ route}) => {
    const { product } = route.params;
    const navigation = useNavigation();

    
    return (
        <View style={styles.container}>



<View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>



  
    <View style={styles.EmProfile}>
        <View>
        <Text style={styles.textName}>Employee Profile</Text>
        <Text style={styles.textID1}>123456</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Password")}>
        <View>
            <Image style={styles.Empbut} source={but} />
        </View>
        </TouchableOpacity>
        </View>

             <View style={styles.PaymentBoxHead}>
        <View style={styles.PaymentBox}>
          <Text style={styles.datatext}>Total Amount</Text>
          <Text style={styles.text}>INR 70000</Text>
        </View>
        <View style={styles.PaymentBox}>
          <Text style={styles.datatext}>Collected Amount</Text>
          <Text style={styles.text}>INR 30000</Text>
        </View>
      </View>

          <ScrollView contentContainerStyle={styles.disp} showsVerticalScrollIndicator={false} >
      {product.map((item,index) => (
        <Product key={index} data={item} />
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
        padding:16,
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
});

export default History;