import React from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function Collection({ data }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ProductDescription", { product: data });
  };

  // console.log(data);
  return (
    <TouchableOpacity onPress={handlePress} disabled={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>{data.customer_name}</Text>
          <Text style={styles.text}>{data.customer_id}</Text>
        </View>

        <View style={styles.chitmaindata}>
          <View style={styles.chitdata}>
            <Text style={styles.datatext}>{data.loan_type}</Text>
            <Text style={styles.Totaltext}>&#8377; {data.collected_amt}</Text>
          </View>
          <View style={styles.collectButton}>
            <TouchableOpacity>
              <Text style={styles.Buttontext}>Collected</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chitbasedata}>
          <Text style={styles.chitbasetext}>Route {data.route_id}</Text>
          <Text style={styles.chitbasetext}>Date: {data.date_created}</Text>
          <Text style={styles.chitbasetext}>Time: {data.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 328, // Increase width
    height: 156, // Increase height
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    // justifyContent: 'center',
    // alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 15,
    color: "#4A516D",
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    height: 41,
    width: 328,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  chitdata: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  chitmaindata: {
    height: 71,
    width: 328,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  collectButton: {
    width: 71,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(16, 158, 56, 0.2)",
    borderRadius: 25,
  },
  Buttontext: {
    color: "#109E38",
    fontSize: 12,
  },
  datatext: {
    color: "#697089",
    fontSize: 12,
  },
  Totaltext: {
    color: "#000",
    fontSize: 20,
  },
  chitbasedata: {
    height: 42,
    width: 326,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#E6E8F0",
    borderBottomLeftRadius: 5,
  },
  chitbasetext: {
    color: "#697089",
    fontSize: 10,
  },
});