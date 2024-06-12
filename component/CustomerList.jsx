import React, { useCallback, useState } from "react";
import { View,StyleSheet,Image } from "react-native";
import CustomerName from "./CustomerName"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Logo = require("../Image/Logo1.png");



const CustomerList = () => {
    const [user, setUser] = useState([]);

  useFocusEffect(
    useCallback(() => {
        const fetchData = async () => {
            try {
            const userId = await AsyncStorage.getItem("userId");
            const token = await AsyncStorage.getItem("token");
                const formData = new FormData();
                formData.append("staff_id", userId);
                formData.append("token", token);
                const response = await fetch("https://nmwinternet.com/staging/demo/admin/Api/show_added_customer", {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                setUser(data.customer);
                console.log( user);


            } catch (error) {
            console.error("Error:", error);
            }
        };
        fetchData();
        }, [])
    );

    return (
        <View style={styles.container}>
             <View style={styles.header}>
        <Image style={styles.logo} source={Logo} />
      </View>
     
      <CustomerName data={user}/>
        </View>
    )
};

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "left",
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
          logo: {
            width: 148,
            height: 48,
            margin: 5,
            resizeMode: "contain",
          },
    });



    export default CustomerList;