import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export default function Product({data}) {

    // console.log(data);
    return (
        <View style={styles.container}>
            <Text>{data.category}</Text>
            <Text>{data.price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 20,
        color: 'black',
        margin: 10,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        alignSelf: "center",
    }
});