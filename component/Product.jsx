import React from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function Product({ data }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("AmountCollect", { product: data });
  };

  // console.log(data);
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>{data.name}</Text>
          <Text style={styles.text}>{data.customer_id}</Text>
        </View>
        <View style={styles.chitmaindata}>
          <View style={styles.chitdata}>
            <Text style={styles.datatext}>{data.loan_type}</Text>
            <Text style={styles.Totaltext}>&#8377; {data.amount}</Text>
          </View>
          <View style={styles.collectButton}>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.Buttontext}>Collect</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chitbasedata}>
          <Text style={styles.chitbasetext}>Paid : &#8377; {data.paid_amount}</Text>
          <Text style={styles.chitbasetext}>Unpaid : &#8377; {data.un_paid_amount}</Text>
          <Text style={styles.chitbasetext}>&#8377; {data.per_day} / day</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 328, // Increase width
    height: 156, // Increase height
    borderColor: "#E6E8F0",
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
    backgroundColor: "#A20A3A",
    borderRadius: 5,
  },
  Buttontext: {
    color: "#fff",
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