import React from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native';
import moment from 'moment';

const ProductDes = ({ route }) => {
  const { product } = route.params;


  console.log('ChitStartdate:', product.ChitStartdate);
  const startDate = moment(product.ChitStartdate, 'YYYY/DD/MM');
  console.log('startDate:', startDate);
  const today = moment();
  const daysTillToday = today.diff(startDate, 'days');

  

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
        <View style={styles.container}>
            <Text style={styles.text}>Chit End Date: {product.ChitEnddate}</Text>
            <Text style={styles.text}>Chit Status: {product.Chitstatus}</Text>
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
    text: {
        fontSize: 15,
        color: '#4A516D',
        
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