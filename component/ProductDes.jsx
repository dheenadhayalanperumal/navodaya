import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";

const QR = require("../Image/QR.png");

const ProductDes = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();
  const [isCashSelected, setCashSelection] = useState(true);
  const [isUPISelected, setUpiSelection] = useState(false);
  const [chitStatus, setChitStatus] = useState(product.Chitstatus);
  const [paidAmount, setPaidAmount] = useState();
  const [staffId, setStaffId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const userToken = await AsyncStorage.getItem("token");
      setStaffId(userId);
      setToken(userToken);
    };

    fetchUserDetails();
  }, []);

  const UserPaid = () => {
    if (staffId && token) {
      const formData = new FormData();
      formData.append("staff_id", staffId);
      formData.append("token", token);
      formData.append("customer_id", product.customer_id);
      formData.append("paid_amount", paidAmount);
      formData.append("payment_mode", isCashSelected ? "cash" : "online");
      console.log("Form Data:", formData);

      fetch("https://nmwinternet.com/staging/demo/admin/Api/update_payment", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response data:", data);
          if (data.status === true) {
            console.log(data);
            navigation.navigate("Payment", { amount: paidAmount });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerfull}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text}>{product.name}</Text>
            <Text style={styles.text}>{product.customer_id}</Text>
          </View>
          <View style={styles.chitmaindata}>
            <View style={styles.chitdata}>
              <Text style={styles.datatext}>{product.loan_type}</Text>
              <Text style={styles.Totaltext}>&#8377; {product.amount}</Text>
            </View>
            <View>
              <Text style={styles.Buttontext}>
                {/* {" "}
                {daysTillToday} / {product.ChitDuration}
                */}
              </Text>
            </View>
          </View>

          <View style={styles.chitbasedata}>
            <Text style={styles.chitbasetext}>Paid : &#8377; {product.paid_amount}</Text>
            <Text style={styles.chitbasetext}>Unpaid : &#8377; {product.un_paid_amount}</Text>
            <Text style={styles.chitbasetext}>&#8377; {product.per_day} / day</Text>
          </View>
        </View>
        <View style={styles.PaymentBoxHead}>
          <View style={styles.PaymentBox}>
            <Text style={styles.datatext}>Paid Amount</Text>
            <Text style={styles.text}>&#8377; {product.paid_amount}</Text>
          </View>
          <View style={styles.PaymentBox}>
            <Text style={styles.datatext}>Remaining Amount</Text>
            <Text style={styles.text}>&#8377; {product.un_paid_amount}</Text>
          </View>
        </View>
        <View style={styles.RouteText}>
          <Text style={styles.text1}>Payment Option</Text>
        </View>
        <View style={styles.CashHeading}>
          <Text style={styles.text}>Cash</Text>
          <RadioButton.Android
            value="cash"
            status={isCashSelected ? "checked" : "unchecked"}
            onPress={() => {
              setCashSelection(true);
              setUpiSelection(false);
            }}
          />
          <Text style={styles.text}>UPI</Text>
          <RadioButton.Android
            value="upi"
            status={isUPISelected ? "checked" : "unchecked"}
            onPress={() => {
              setUpiSelection(true);
              setCashSelection(false);
            }}
          />
        </View>
        <View style={styles.Collect}>
          {isUPISelected && <Image style={styles.Image} source={QR} />}
          <View style={styles.SearchInput}>
            <TextInput
              style={styles.Searchtext}
              placeholder="Enter the Amount"
              keyboardType="numeric"
              onChangeText={(value) => setPaidAmount(value)}
            />
            <TouchableOpacity style={styles.SearchButton} onPress={UserPaid}>
              <Text style={styles.ButtonText}>Collect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerfull: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  CashHeading: {
    height: 48,
    width: 360,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 12,
  },
  Image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  checkbox: {
    alignSelf: "center",
  },
  container: {
    width: 328,
    height: 156,
    borderColor: "#E6E8F0",
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
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
    borderColor: "#E6E8F0",
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
  text1: {
    fontSize: 20,
    color: "#A20A3A",
    textAlign: "left",
    paddingLeft: 16,
    marginLeft: 16,
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
  PaymentBoxHead: {
    width: 328,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  PaymentBox: {
    width: 156,
    height: 70,
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
  Collect: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom:100,
  },
  Buttontext: {
    color: "#A20A3A",
    fontSize: 16,
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

export default ProductDes;
