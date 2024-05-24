import react from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const right = require("../Image/right.png");

const CustomerGreen = () => {
    
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <Image source={right} style={styles.logo} />
        <Text style={styles.text}>Customer successfully Added</Text>
        {/* <Text style={styles.text}>{amount}</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate("Home1")}>
            <View style={styles.butto}>
                <Text style={styles.text}>Continue</Text>
            </View>
        </TouchableOpacity>
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A20A3A",
    },
    text: {
        fontSize: 20,
        color: "white",
    },
    butto: {
        backgroundColor: "#FFAA10",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20,
        // borderWidth: 1,
    },
    logo: {
        width: 156,
        height: 156,
        resizeMode: "contain",
        alignSelf: "center",
    },
});

export default CustomerGreen;
