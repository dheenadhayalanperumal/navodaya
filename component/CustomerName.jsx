import React from "react";

import { View, Text, StyleSheet, Image,TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Logo = require("../Image/empImg.png");

const CustomerName = (data) => {
    const navigation = useNavigation();

   
        const handlePress = (id) => {
           
             navigation.navigate("CustomerData", { id: id });

        }

    return (
        <View style={styles.container}>


{data.data.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handlePress(item.id)}>
                    <View style={styles.header}>
                        <Image style={styles.logo} source={Logo} />
                        <View style={styles.datas}>
                            <Text style={styles.Name}>{item.customer_name}</Text>
                            <Text style={styles.Phone}>{item.customer_id}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}

            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        justifyContent: "flex-start",
        marginLeft: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom:12,
        marginTop:12,
        width: "100%",
        backgroundColor: "#fff",
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50,
        // margin: 5,
        resizeMode: "contain",
    },
    Name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#303651",
    },
    Phone: {
        fontSize: 12,
        color: "#697089",
    },
    datas: {
        marginLeft: 12  ,
    },
});

export default CustomerName;