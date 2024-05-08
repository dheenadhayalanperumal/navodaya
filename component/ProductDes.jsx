import React from 'react';
import { View, Text, Image, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import moment from 'moment';
import { useState } from 'react';

import { RadioButton } from 'react-native-paper';
const QR = require("../Image/QR.png");


const ProductDes = ({ route }) => {
  const { product } = route.params;


  // console.log('ChitStartdate:', product.ChitStartdate);
  const startDate = moment(product.ChitStartdate, 'YYYY/DD/MM');
  // console.log('startDate:', startDate);
  const today = moment();
  const daysTillToday = today.diff(startDate, 'days');
  const [isCashSelected, setCashSelection] = useState(false);
  const [isUPISelected, setUpiSelection] = useState(false);

  

  return (
    <View style={styles.containerfull}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>{product.UserName}</Text>
          <Text style={styles.text}>{product.Userid}</Text>
        </View>
        <View style={styles.chitmaindata}>
          <View style={styles.chitdata}>
            <Text style={styles.datatext}>{product.Chitid}</Text>
            <Text style={styles.Totaltext}>INR{product.LoanAmount}</Text>
          </View>
          <View>
            <Text style={styles.Buttontext}>
              {" "}
              {daysTillToday} / {product.ChitDuration}
            </Text>
          </View>
        </View>

        <View style={styles.chitbasedata}>
          <Text style={styles.chitbasetext}>Route- 05</Text>
          <Text style={styles.chitbasetext}>{product.ChitStartdate}</Text>
          <Text style={styles.chitbasetext}>{product.DailyPay} per day</Text>
        </View>
      </View>
        <View style={styles.PaymentBoxHead}>
          <View style={styles.PaymentBox}>
            <Text style={styles.datatext}>Paid Amount</Text>
            <Text style={styles.text}>INR 70000</Text>
            </View>
            <View style={styles.PaymentBox}>
            <Text style={styles.datatext}>Remaining Amount</Text>
            <Text style={styles.text}>INR 30000</Text>
            </View>
</View>
<View style={styles.RouteText}>
      <Text style={styles.text1}>Payment Option</Text>
      </View>
      <View style={styles.CashHeading}>
  <Text style={styles.text}>Cash</Text>
  <RadioButton
    value="cash"
    status={ isCashSelected ? 'checked' : 'unchecked' }
    onPress={() => {
      setCashSelection(true);
      setUpiSelection(false);
    }}
  />
  <Text style={styles.text}>UPI</Text>
  <RadioButton
    value="upi"
    status={ isUPISelected ? 'checked' : 'unchecked' }
    onPress={() => {
      setUpiSelection(true);
      setCashSelection(false);
    }}
  />

</View>
<View style={styles.Collect}>
  <View>
  {isUPISelected && <Image style={styles.Image} source={QR} />}
  </View>
  <View style={styles.SearchInput}>
        <TextInput style={styles.Searchtext} placeholder="Enter the Amount"/>

        <TouchableOpacity
          style={styles.SearchButton}
          onPress={() => alert("Search")}
        >
          <Text style={styles.ButtonText}>{product.Chitstatus}</Text>
        </TouchableOpacity>
      </View>

  


</View>


    </View>
  );
}

const styles = StyleSheet.create({  
    containerfull: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
      },
      CashHeading: {
        height:48,
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
        width: 328, // Increase width
        height: 156, // Increase height
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
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
    text1: {
      fontSize: 20,
      color: "#A20A3A",
      textAlign:"left",
      paddingLeft:16,
      marginLeft: 16,
  
    },
     RouteText:{
    width: '100%',
    height: 43,
borderRadius: 5,
    backgroundColor: "#F4F6F9",
    alignItems: "left",
    justifyContent: "center",
    marginTop: 12,
  
  },

    PaymentBoxHead: {
      width: 328, // Increase width
      height: 70, // Increase height
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    PaymentBox: {
        width: 156, // Increase width
        height: 70, // Increase height
        borderColor: '#E6E8F0',
        borderWidth: 0.5,
        backgroundColor: '#F4F6F9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'column',

    },
    text: {
        fontSize: 15,
        color: '#4A516D',
        fontWeight: 'bold'
        
        
    },
    logo: {
        width: 100,
        height: 100,
    },
    header: {
        height:41,
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
    chitmaindata:{
        height: 71,
        width: 328,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,

    },
    collectButton:{
        width:71,
        height: 29,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#A20A3A",
        borderRadius: 5,
      
    },
    Collect:{
      alignItems: "center",
      justifyContent: "center",
    },
    Buttontext:{
        color: "#A20A3A",
        fontSize: 16,
    },
    datatext:{
        color: "#697089",
        fontSize: 12,
    },
    Totaltext:{
        color: "#000",
        fontSize: 20,
    },
    chitbasedata:{
        height:42,
        width: 326,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor:"#E6E8F0",
        borderBottomLeftRadius: 5,
    },
    chitbasetext:{
        color: "#697089",
        fontSize: 10,
    }


});
export default ProductDes;